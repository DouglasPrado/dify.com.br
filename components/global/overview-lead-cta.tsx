import CreateLeadButton from "./create-lead-button";
import CreateLeadModal from "../modal/create-lead";

export default async function OverviewLeadCTA({ data, colors, price, section }: any) {
  return (
    <CreateLeadButton price={price} colors={colors} section={section}>
      <CreateLeadModal dataSet={data} colors={colors} price={price} section={section}/>
    </CreateLeadButton>
  );
}
