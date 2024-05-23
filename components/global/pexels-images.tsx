"use client";
import { Search } from "lucide-react";
import { useCallback, useState } from "react";
import LoadingCircle from "../icons/loading-circle";
import { useGoogleSuggestions } from "./google-suggestions";
import ImageCard from "./image-card";

export default function PexelsImages() {
  const [data, setData] = useState<any>(null);
  const [enableSuggestion, setEnableSuggestion] = useState(true);
  const [loading, setLoading] = useState(false);
  const [inputSearch, setInputSearch] = useState("");
  const { suggestions } = useGoogleSuggestions({
    search: inputSearch,
  });

  const handleSearch = useCallback(
    async (suggestion?: string) => {
      setEnableSuggestion(false);
      setLoading(!loading);
      if (suggestion) {
        setInputSearch(suggestion);
      }

      fetch(`/api/pexels/images/${inputSearch || suggestion}`)
        .then((res) => res.json())
        .then((res: any) => {
          setData(res);
          setLoading(!loading);
          setInputSearch("");
        });
    },
    [inputSearch, loading],
  );
  return (
    <div className="relative flex w-full flex-col gap-6 rounded-lg border border-stone-200 bg-white shadow-md transition-all hover:shadow-xl">
      <div className="absolute flex w-full flex-col p-6">
        <div className="flex items-center justify-between rounded-lg border ">
          <input
            type="text"
            placeholder="pesquisar imagens no pexels"
            className="w-full rounded-lg border-0 outline-0 ring-0 focus:border-0 focus:outline-none focus:ring-0"
            value={inputSearch}
            onChange={(e: any) => {
              setEnableSuggestion(true);
              setInputSearch(e.target.value);
            }}
          />
          {!loading ? (
            <button className="mr-3 " onClick={() => handleSearch()}>
              <Search
                className="rounded-lg p-2 hover:bg-black hover:text-white"
                size={36}
              />
            </button>
          ) : (
            <div className="relative mr-3 flex h-6 items-center">
              <LoadingCircle />
            </div>
          )}
        </div>
        {enableSuggestion && inputSearch !== "" && suggestions && (
          <div className="absoute mt-2 gap-1 bg-white px-3">
            {suggestions.map((suggestion: string, idxSuggestion: number) => (
              <button
                className="mb-2 flex w-full cursor-pointer items-center justify-between gap-3 bg-gray-100 px-3 py-2 text-sm text-gray-600 hover:bg-gray-200 hover:bg-opacity-90"
                key={`suggestion-${idxSuggestion}`}
                onClick={() => handleSearch(suggestion)}
              >
                {suggestion}{" "}
                <span className="rounded-full bg-gray-200 px-2 text-[9px] text-gray-400">
                  pesquisar
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-14 grid grid-cols-3 justify-center gap-3  p-6">
        {data
          ? data.images?.photos?.map(
              (
                image: {
                  alt: string;
                  src: { original: string };
                  image: any;
                  mime: string;
                },
                idxImage: any,
              ) =>
                image.src && (
                  <ImageCard
                    key={`${image.src.original}-${idxImage}`}
                    title={image.alt}
                    src={image.src.original}
                  />
                ),
            )
          : loading && (
              <span className="flex items-center justify-center gap-3 text-sm text-gray-800">
                Estamos puxando imagens
              </span>
            )}
      </div>
    </div>
  );
}
