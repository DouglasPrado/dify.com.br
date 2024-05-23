"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Media } from "@prisma/client";
import { PlaySquare } from "lucide-react";
import Image from "next/image";
import GoogleImages from "../../../../../../../../components/global/google-images";
import PexelsImages from "../../../../../../../../components/global/pexels-images";
import UploadImages from "../../../../../../../../components/global/upload-images";

export default function PostSidebarActions({
  medias,
  siteId,
}: {
  siteId: string;
  medias: Media[];
}) {
  return (
    <div className="">
      <div className="flex flex-col">
        <div className="flex w-full flex-col gap-3 bg-stone-50 p-6 ">
          <Tabs defaultValue="google">
            <TabsList>
              <TabsTrigger value="google">
                <span className="flex gap-2">
                  <div className="h-5 w-5">
                    <Image
                      alt="[Google Login]"
                      src={"/google.svg"}
                      width={80}
                      height={80}
                    />
                  </div>
                  Google
                </span>
              </TabsTrigger>
              <TabsTrigger value="pexels">
                <span className="flex gap-2">
                  <div className="h-5 w-5">
                    <Image
                      alt="[Google Login]"
                      src={
                        "https://play-lh.googleusercontent.com/KtFwMsqVzBBpTFc8vR5SZRCNBvqknlWurnzTRl4J-2kdZhoM04LjklX9Vh8pl-fYfpU"
                      }
                      width={80}
                      height={80}
                    />
                  </div>
                  Pexels
                </span>
              </TabsTrigger>
              <TabsTrigger value="upload">
                <div className="flex items-center gap-2">
                  <PlaySquare />
                  Galeria
                </div>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="google">
              <h1 className="font-cal">Pesquisar imagens no google</h1>
              <p className="mb-3 text-xs text-gray-700">
                Somente imagens sem direitos autorais serão exibidos ( max: 9
                imagens por pesquisa )
              </p>
              <GoogleImages />
            </TabsContent>
            <TabsContent value="pexels">
              <h1 className="mb-3 font-cal">Pesquisar imagens no pexels</h1>
              <PexelsImages />
            </TabsContent>
            <TabsContent value="upload">
              <h1 className="mb-3 font-cal">Fazer upload do seu computador</h1>
              <UploadImages siteId={siteId} medias={medias} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
