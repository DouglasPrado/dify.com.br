"use client";
import Icon from "@/components/global/icon";
import LoadingDots from "@/components/icons/loading-dots";
import { Button } from "@/components/ui/button";
import { useSettingsPostStore } from "@/lib/stores/SettingsPostStore";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FC, ReactElement, useCallback, useState } from "react";

type ProductCardProps = {
  product: Product;
};

const ProductCard: FC<ProductCardProps> = ({
  product,
}: ProductCardProps): ReactElement => {
  const [hover, setHover] = useState(false);
  const { id } = useParams() as { id: string };
  const [addProduct, selectedProducts, removeProduct, loading] =
    useSettingsPostStore((state) => [
      state.addProduct,
      state.selectedProducts,
      state.removeProduct,
      state.loading,
    ]);
  const handleAddProdut = useCallback(async () => {
    setHover(false);
    addProduct(product, id);
  }, [addProduct, product, id]);

  const handleRemoveProdut = useCallback(() => {
    if (hover) removeProduct(product, id);
  }, [removeProduct, product, hover, id]);

  const selected = selectedProducts.some((selected) => product.id && selected);
  return (
    <div
      className={cn(
        !loading &&
          "cursor-pointer hover:border-stone-900 hover:text-stone-700 ",
        "flex flex-col items-start gap-2 rounded-lg  border p-2 text-stone-500 transition-all hover:-translate-y-1 ",
      )}
    >
      <Image
        alt={product.title || "Sem nome definido"}
        width={0}
        height={0}
        className="w-full rounded-lg object-contain"
        style={{
          width: "100%",
          height: "auto",
        }}
        src={
          product.image ||
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEACAYAAABccqhmAAAAAXNSR0IArs4c6QAACixJREFUeF7t3TFSJEAMQ9HhBNz/jESkJLuH+EGXym9zirKxvmUx9H79/f39+4R/v7+/4as/n+/v7/T1vr/+lwG6Pn9fAABARUAAvA1gAOBAiv4/AAAAaYCuWzD1c2BFQBXAHAAHUOaPAxjPwAAAAAAgdKBu4NcOEAAAIIz/hwPgALZDkNcE9v1lAIXA1YFwABxAmT8OgAPgAIqCOAAOoMwPBzBOYAAAAAAIHagEJEACDOM3fwLJAGQAZf7nBXB9AQAAAABA6MC6AwUAAAjj73MAACCESwK6bkHV/zaD+fr5+UnvAfgBvv0B6r/+lw0EABxMmR8PuoyfkAAAAAAQOrDuwAAAAML4e9INAMYt0HqKuz6A+v/2o/QcAAfAAYQOrAMYAAAgjL8TAACcAElALPBbC3y9/xwAB5AAtr4BAcAHgQggdAAAtj+IxAFwAEH+MoB1AAIAAABA6AAACAHD+Phruus3+Ov6OQAOIAFsfQO+FuDr7w8AAAAAoQPrAAQAAAjjLwScB4D/Hnz71zivLaTvv/1BJk+CCTGTAwAAAEgDtG6hCGBbANfnjwPgABLAAXAbgAAAAAAQOrAOQAAAgDD+PsgEAH6NlgR0/QZV/9vfQnEAHEAC2PoGvA4gAAAAAAgdWAcgAABAGH8ZAADIAJKArltQ9csAkoDWCUwAbwVwvf9OACcAAIcOrC8gAACAMP4yAACQASQBXbeg6n97AnEAHEAC2PoGvA4gD4JwMAkA1wW0Xj8AAAAAhA4AAAsdxkeI5oR4++fEHAAHkAC2vgGvAwgAAAAAQgfWAQgAABDG36vAACADSAK6bkHVLwNIAlonMAG8FcD1/jsBnAAAHDqwvoAAAADC+MsAAEAGkAR03YKq/+0JxAFwAAlg6xvwOoAAAAAAIHRgHYAAAABh/GUAACADSAK6bkHVLwNIAlonMAG8FcD1/nsQhINJAL4uoPX6AQAAACB0AACEaGF8hGhOOG8CJgGtE5gA3grgev+dAE4AAA4dWF9AAAAAYfw9aQYAMoAkoOsWVP1vTyAOgANIAFvfgNcBBAAAAAChA+sABAAACOMvAwAAGUAS0HULqn4ZQBLQOoEJ4K0ArvffCeAEAODQgfUFBAAAEMZfBgAAMoAkoOsWVP1vTyAOgANIAFvfgNcB5EkwDiYB4LqA1usHAAAAgNABAGChw/gI0ZwQb59E4wA4gASw9Q14HUAAAAAAEDqwDkAAAIAw/p40AwAZQBLQdQuqfhlAEtA6gQngrQCu998J4AQA4NCB9QUEAAAQxl8GAAAygCSg6xZU/W9PIA6AA0gAW9+A1wEEAAAAAKED6wAEAAAI4y8DAAAZQBLQdQuqfhlAEtA6gQngrQCu99+DIBxMAvB1Aa3XDwAAAAChAwAgRAvjI0RzwnkTMAloncAE8FYA1/vvBHACAHDowPoCAgAACOPvSTMAkAEkAV23oOp/ewJxABxAAtj6BrwOIAAAAAAIHVgHIAAAQBh/GQAAyACSgK5bUPXLAJKA1glMAG8FcL3/TgAnAACHDqwvIAAAgDD+MgAAkAEkAV23oOp/ewJxABxAAtj6BrwOIE+CcTAJANcFtF4/AAAAAIQOAAALHcZHiOaEePskGgfAASSArW/A6wACAAAAgNCBdQACAACE8fekGQDIAJKArltQ9csAkoDWCUwAbwVwvf9OACcAAIcOrC8gAACAMP4yAACQASQBXbeg6n97AnEAHEAC2PoGvA4gAAAAAAgdWAcgAABAGH8ZAADIAJKArltQ9csAkoDWCUwAbwVwvf8eBOFgEoCvC2i9fgAAAAAIHQAAIVoYHyGaE86bgElA6wQmgLcCuN5/J4ATAIBDB9YXEAAAQBh/T5oBgAwgCei6BVX/2xOIA+AAEsDWN+B1AAEAAABA6MA6AAEAAML4ywAAQAaQBHTdgqpfBpAEtE5gAngrgOv9dwI4AQA4dGB9AQEAAITxlwEAgAwgCei6BVX/2xOIA+AAEsDWN+B1AHkSjINJALguoPX6AQAAACB0AABY6DA+QjQnxNsn0TgADiABbH0DXgcQAAAAAIQOrAMQAAAgjL8nzQBABpAEdN2Cql8GkAS0TmACeCuA6/13AjgBADh0YH0BAQAAhPGXAQCADCAJ6LoFVf/bE4gD4AASwNY34HUAAQAAAEDowDoAAQAAwvjLAABABpAEdN2Cql8GkAS0TmACeCuA6/33IAgHkwB8XUDr9QMAAABA6AAACNHC+AjRnHDeBEwCWicwAbwVwPX+OwGcAAAcOrC+gAAAAML4e9IMAGQASUDXLaj6355AHAAHkAC2vgGvAwgAAAAAQgfWAQgAABDGXwYAADKAJKDrFlT9MoAkoHUCE8BbAVzvvxPACQDAoQPrCwgAACCMvwwAAGQASUDXLaj6355AHAAHkAC2vgGvA8iTYBxMAsB1Aa3XDwAAAAChAwDAQofxEaI5Id4+icYBcAAJYOsb8DqAAAAAACB0YB2AAAAAYfw9aQYAMoAkoOsWVP0ygCSgdQITwFsBXO+/E8AJAMChA+sLCAAAIIy/DAAAZABJQNctqPrfnkAcAAeQALa+Aa8DCAAAAABCB9YBCAAAEMZfBgAAMoAkoOsWVP0ygCSgdQITwFsBXO+/B0E4mATg6wJarx8AAAAAQgcAQIgWxkeI5oTzJmAS0DqBCeCtAK733wngBADg0IH1BQQAABDG35NmACADSAK6bkHV//YE4gA4gASw9Q14HUAAAAAAEDqwDkAAAIAw/jIAAJABJAFdt6DqlwEkAa0TmADeCuB6/50ATgAADh1YX0AAAABh/GUAACADSAK6bkHV//YE4gA4gASw9Q14HUCeBONgEgCuC2i9fgAAAAAIHQAAFjqMjxDNCfH2STQOgANIAFvfgNcBBAAAAAChA+sABAAACOPvSTMAkAEkAV23oOqXASQBrROYAN4K4Hr/nQBOAAAOHVhfQAAAAGH8ZQAAIANIArpuQdX/9gTiADiABLD1DXgdQAAAAAAQOrAOQAAAgDD+MgAAkAEkAV23oOqXASQBrROYAN4K4Hr/PQjCwSQAXxfQev0AAAAAEDoAAEK0MD5CNCecNwGTgNYJTABvBXC9/04AJwAAhw6sLyAAAIAw/p40AwAZQBLQdQuq/rcnEAfAASSArW/A6wACAAAAgNCBdQACAACE8ZcBAIAMIAnougVVvwwgCWidwATwVgDX++8EcAIAcOjA+gICAAAI4y8DAAAZQBLQdQuq/rcnEAfAASSArW/A6wDyJBgHkwBwXUDr9QMAAABA6AAAsNBhfIRoToi3T6JxABxAAtj6BrwOIAAAAAAIHVgHIAAAQBh/T5oBgAwgCei6BVW/DCAJaJ3ABPBWANf77wRwAgBw6MD6AgIAAAjjLwMAABlAEtB1C6r+tycQB8ABJICtb8DrAAIAAACA0IF1AAIAAITxlwEAgAwgCei6BVW/DCAJaJ3ABPBWANf7/x/aVlkHhH7qqQAAAABJRU5ErkJggg=="
        }
      />
      <div className="mt-2 flex flex-col ">
        <h3 className="font-cal text-sm ">
          {product.title || "Sem nome definido"}
        </h3>
        <span className="line-clamp-2 text-xs text-stone-500">
          {product.shortDescription || "Não possui descrição"}
        </span>
        <strong className="line-clamp-2 text-xs text-stone-500">
          {product.price || "-"}
        </strong>
      </div>
      {loading ? (
        <Button disabled className="w-full" size={"sm"}>
          <LoadingDots />
        </Button>
      ) : selected ? (
        <Button
          onClick={handleRemoveProdut}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className={cn(
            "w-full bg-emerald-500 text-white transition-all hover:bg-red-500/90",
          )}
          size={"sm"}
        >
          {hover ? (
            <>
              Remover
              <Icon icon="Trash" className="ml-3 text-white" />
            </>
          ) : (
            <>
              Selecionado
              <Icon icon="Check" className="ml-3 text-white" />
            </>
          )}
        </Button>
      ) : (
        <Button onClick={handleAddProdut} className="w-full" size={"sm"}>
          Selecionar
        </Button>
      )}
    </div>
  );
};

export default ProductCard;