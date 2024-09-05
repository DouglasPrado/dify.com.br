"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SerpProduct } from "@/lib/serper";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FC, ReactElement } from "react";
import ConfigCloneGoogleButton from "./config-clone-google-button";
import ConfigCloneGoogleModal from "./config-clone-google-modal";
type ProductCardProps = {
  product: SerpProduct;
};

const GoogleProductCard: FC<ProductCardProps> = ({
  product,
}: ProductCardProps): ReactElement => {
  return (
    <div
      className={cn(
        "hover:border-stone-900 hover:text-stone-700 ",
        "flex flex-col items-start gap-2 rounded-lg  border p-2 text-stone-500 transition-all hover:-translate-y-1 ",
      )}
    >
      <div className="flex gap-2">
        <div
          className={cn(
            product.position === 1
              ? "bg-gradient-to-tr from-yellow-400  via-amber-500 to-yellow-400 text-stone-50"
              : product.position > 1 && product.position <= 3
              ? "bg-gradient-to-tr from-orange-400  via-orange-600 to-orange-500 text-stone-50"
              : "bg-gradient-to-tr from-stone-300  via-stone-100 to-stone-300 text-stone-500",
            "absolute flex h-6 w-6 items-center justify-center rounded-full shadow",
          )}
        >
          <span className="font-cal text-sm">{product.position}</span>
        </div>
        <Image
          alt={product.title || "Sem nome definido"}
          width={0}
          height={0}
          className="object-contain"
          style={{
            width: "75px",
            height: "75px",
          }}
          src={
            product.imageUrl ||
            "data:image/png;base64,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"
          }
        />
        <div className="mt-2 flex flex-col gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild className="">
                <div className="flex flex-col gap-2">
                  <h3 className="line-clamp-2 font-cal text-xs">
                    {product.title || "Sem nome definido"}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="line-clamp-2 text-xs text-stone-500">
                      {product.source}
                    </span>
                    {product.rating && (
                      <div className="flex items-center gap-1 text-xs text-stone-500">
                        <span>{product.rating}</span>
                        <span className="font-light">
                          ({product.ratingCount})
                        </span>
                      </div>
                    )}
                  </div>
                  <strong className="line-clamp-2 text-xs text-stone-500">
                    {product.price || "-"}
                  </strong>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs text-stone-700">
                  {product.title || "Sem nome definido"}
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <ConfigCloneGoogleButton>
        <ConfigCloneGoogleModal product={product} />
      </ConfigCloneGoogleButton>
    </div>
  );
};

export default GoogleProductCard;
