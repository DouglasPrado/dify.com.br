"use client";
import Barcode from "react-barcode";

export default function BarCode({ value }: { value: string }) {
  return <Barcode value={value} />;
}
