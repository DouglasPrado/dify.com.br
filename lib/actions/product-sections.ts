"use server";

import { withProductAuth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Product, Site } from "@prisma/client";
import { put } from "@vercel/blob";
import { nanoid } from "nanoid";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const deleteProductSection = async (id: string) => {
  try {
    const response = await prisma.productSections.delete({
      where: {
        id,
      },
    });

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
export const addProductSection = withProductAuth(
  async (
    data: any,
    product: string &
      Product & {
        site: Site;
      },
    key: string,
  ) => {
    let payload: any = {};
    try {
      if (data.get("image")) {
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
          return {
            error:
              "Missing BLOB_READ_WRITE_TOKEN token. Note: Vercel Blob is currently in beta – please fill out this form for access: https://tally.so/r/nPDMNd",
          };
        }
        const file = data.get("image") as File;
        const filename = `${nanoid()}.${file.type.split("/")[1]}`;

        const { url } = await put(filename, file, {
          access: "public",
        });
        payload["image"] = url || "";
      }
      for (const p of data) {
        if (p[0] !== "image") {
          payload = {
            ...payload,
            [p[0]]: p[1],
          };
        }
        if (p[0] === "price") {
          const priceStripe = await stripe.prices.create({
            currency: "BRL",
            nickname: `${payload.title}`,
            unit_amount: Number(p[1]),
          });
          payload.priceId = priceStripe.id;
        }
      }

      const section = await prisma.productSections.create({
        data: {
          product: { connect: { id: product.id } },
          reference: key,
          content: JSON.stringify(payload),
        },
      });

      return section;
    } catch (error) {
      console.log(error);
    }
  },
);
