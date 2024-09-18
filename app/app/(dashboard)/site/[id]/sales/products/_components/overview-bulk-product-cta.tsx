import CreateBulkProductModal from "@/components/modal/create-bulk-product";
import { getSession } from "@/lib/auth";
import CreateProductButton from "./create-product-button";

export default async function OverviewBulkProductCTA({
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
      <CreateBulkProductModal type={type} />
    </CreateProductButton>
  );
}
