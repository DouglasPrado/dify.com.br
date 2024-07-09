import { BarChart } from "lucide-react";
import CopyButton from "../../../../../../../components/global/copy-button";
import { LinkMenu } from "../../../../../../../components/menu/link-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../../../../components/ui/avatar";
export default async function LinkCard({ data }: { data: any }) {
  let url = data.site.customDomain
    ? `${data.site.customDomain}/link/${data.url}`
    : `${data.site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}/link/${data.url}`;
  return (
    <div className="flex items-center justify-between rounded-lg p-6 shadow">
      <div className="flex gap-6">
        <Avatar className="h-12 w-12">
          <AvatarImage src={data.image} />
          <AvatarFallback className="from bg-gradient-to-tr from-[#FF95C8] to-[#F7FF7C] font-semibold text-black" />
        </Avatar>
        <div className="flex flex-col ">
          <h1 className="font-title">Preview da home</h1>

          <div className="flex items-center gap-3">
            <span className="text-sm text-indigo-400">{url}</span>
            <CopyButton
              className="h-7 w-7 rounded-full border-none bg-indigo-50 p-2 text-indigo-400 shadow-none hover:bg-indigo-100"
              string={url}
            />
          </div>
        </div>
      </div>

      <div className="flex h-12 gap-3">
        <div className="flex items-center gap-3 rounded bg-emerald-100 px-4">
          <BarChart color="green" size={18} />
          <span className="text-sm text-green-700">{data.clicks} Cliques</span>
        </div>
        <LinkMenu data={data} />
      </div>
    </div>
  );
}
