import { eventServer } from "@/lib/facebook";
import prisma from "@/lib/prisma";
import { Site } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
export async function POST(req: NextRequest) {
  const body = await req.json();
  let priceStripeId: string = "";
  if (body.priceId) {
    priceStripeId = body.priceId;
  } else {
    const stripeProduct = await stripe.products.retrieve(body.productId);
    priceStripeId = `${stripeProduct.default_price}`;
  }
  if (body.name) {
    const whitelist = await prisma.whitelist.findFirst({
      where: {
        utm_campaign: body.utm_campaign,
        utm_medium: body.utm_medium,
        utm_source: body.utm_source,
        ref: body.id,
      },
    });

    whitelist &&
      (await prisma.lead.create({
        data: {
          name: body.name,
          email: body.email,
          phoneNumber: body.phoneNumber,
          whitelist: { connect: { id: whitelist.id } },
        },
      }));

    const site: Site | null = await prisma.site.findFirst({
      where: {
        id: whitelist?.siteId,
      },
    });
    console.log(
      site?.fbTokenAccess!,
      site?.fbPixelId!,
      "leadCheckout",
      body.name,
      body.email,
      body.phoneNumber,
      req.url,
      body.productId,
      body.price,
    );
    site &&
      (await eventServer(
        site.fbTokenAccess!,
        site.fbPixelId!,
        "leadCheckout",
        body.name,
        body.email,
        body.phoneNumber,
        req.url,
        body.productId,
        body.price,
        req,
      ));
  }
  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: priceStripeId,
        quantity: 1,
      },
    ],
    consent_collection: {
      terms_of_service: "required",
    },
    custom_text: {
      terms_of_service_acceptance: {
        message: "Eu aceito [Termos e serviços](https://example.com/terms)",
      },
    },
    success_url: `${req.headers.get("origin")}/product/${
      body.slug
    }?success=true`,
    cancel_url: `${req.headers.get("origin")}/product/${
      body.slug
    }?canceled=true`,
    metadata: {
      ref: body.id,
      utm_campaign: body.utm_campaign,
      utm_medium: body.utm_medium,
      utm_source: body.utm_source,
    },
  });

  if (!checkoutSession.url) {
    return NextResponse.json(
      {
        error: {
          code: "stripe-error",
          message: "Could not create checkout session",
        },
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ session: checkoutSession }, { status: 200 });
}
