"use client";
import LoadingSpinner from "@/components/form/loading-spinner";
import Icon from "@/components/global/icon";
import LoadingCircle from "@/components/icons/loading-circle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useKnowledgeStore } from "@/lib/stores/KnowledgeStore";
import { toCamelCase } from "@/lib/utils";
import { FC, ReactElement, useCallback, useEffect } from "react";
type TableKnowledgeProps = {
  data: any;
};

const TableKnowledge: FC<TableKnowledgeProps> = ({
  data,
}: TableKnowledgeProps): ReactElement => {
  const [loadKnowledges, knowledges, removeKnowledge, loading] =
    useKnowledgeStore((state) => [
      state.loadKnowledges,
      state.knowledges,
      state.removeKnowledge,
      state.loading,
    ]);

  useEffect(() => {
    loadKnowledges(data.references);
  }, [data.references, loadKnowledges]);

  const handleRemoveKnowledge = useCallback(
    (data: any) => {
      removeKnowledge(data);
    },
    [removeKnowledge],
  );

  return (
    <div>
      {knowledges.length > 0 ? (
        <>
          <h2 className="font-cal text-stone-800">Base de conhecimento</h2>
          <Table>
            <TableCaption>Base de conhecimento.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Tipo</TableHead>
                <TableHead className="w-full">Nome</TableHead>
                <TableHead>Preview</TableHead>
                <TableHead className="text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {knowledges.map((reference: any, idxReference: number) => (
                <TableRow key={`key-reference-${idxReference}`}>
                  <TableCell>
                    <Icon
                      icon={
                        reference.type === "url"
                          ? "Link2"
                          : toCamelCase(reference.type)
                      }
                      size={22}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {reference.title || "Documento sem título"}
                  </TableCell>
                  <TableCell>
                    <Sheet>
                      <SheetTrigger>Visualizar</SheetTrigger>
                      <SheetContent className="w-full max-w-[320px] sm:max-w-[740px]">
                        <SheetHeader>
                          <SheetTitle>
                            <div className="flex items-start gap-3">
                              <Icon
                                icon={
                                  reference.type === "url"
                                    ? "Link2"
                                    : toCamelCase(reference.type)
                                }
                                size={"26"}
                              />
                              {reference.title || "Documento sem título"}
                            </div>
                          </SheetTitle>
                          <SheetDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </SheetDescription>
                        </SheetHeader>
                        <div className="my-6 flex flex-col gap-3">
                          <Input defaultValue={reference.title} />
                          <Textarea defaultValue={reference.content} />
                        </div>
                        <SheetFooter>
                          <SheetClose asChild>
                            <Button type="submit">Salvar mudanças</Button>
                          </SheetClose>
                        </SheetFooter>
                      </SheetContent>
                    </Sheet>
                  </TableCell>
                  <TableCell className="text-right">
                    {!loading ? (
                      <Button
                        variant={"link"}
                        onClick={() => handleRemoveKnowledge(reference)}
                        className="h-8 w-8 rounded-full p-0.5 hover:bg-stone-100"
                      >
                        <Icon icon="Trash" className=" text-rose-500" />
                      </Button>
                    ) : (
                      <Button
                        variant={"link"}
                        disabled
                        className="h-8 w-8 rounded-full p-0.5 hover:bg-stone-100"
                      >
                        <LoadingCircle />
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        loading && (
          <div className="flex w-full items-center justify-center gap-6 ">
            <span className="text-xs font-light text-stone-500">
              Carregando base de conhecimento...
            </span>
            <LoadingSpinner />
          </div>
        )
      )}
    </div>
  );
};

export default TableKnowledge;
