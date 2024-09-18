import CreateProductModal from "@/components/modal/create-product";
import { getSession } from "@/lib/auth";
import CreateProductButton from "./create-product-button";

export default async function OverviewProductCTA({
  title,
  type,
}: {
  title: string;
  type: string;
}) {
  const session = await getSession();
  if (!session) {
    return 0;
  }

  return (
    <CreateProductButton title={title}>
      <CreateProductModal type={type} />
    </CreateProductButton>
  );
}
