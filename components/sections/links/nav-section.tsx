"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface NavSectionProps {
  cover: string;
  name: string;
  description: string;
}

export default function LinkNavSection({
  cover,
  name,
  description,
}: NavSectionProps) {
  return (
    <>
      <nav
        className={cn(
          "bg-[length:700px_700px] bg-center bg-no-repeat object-cover sm:bg-none",
          `top-0 mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 sm:hidden lg:mx-0 lg:justify-between lg:px-0 lg:py-6`,
        )}
        style={{
          backgroundImage: `url("${cover}")`,
        }}
      >
        <div
          className={`flex h-96 w-full items-end justify-center bg-gradient-to-t from-white to-transparent lg:h-auto dark:from-black`}
        >
          <div className="flex flex-col items-center justify-center gap-2 p-6">
            <div className="hidden sm:block">
              <Avatar className="h-32 w-32 rounded-full border-2 border-black dark:border-white">
                <AvatarImage src={cover} className="object-cover" />
                <AvatarFallback className="from bg-gradient-to-tr from-[#FF95C8] to-[#F7FF7C] font-semibold text-stone-700" />
              </Avatar>
            </div>
            <div className="flex items-center justify-center gap-2">
              <h1 className="font-title text-2xl text-stone-700 dark:text-stone-100">
                {name}
              </h1>
              <svg
                fill="rgb(0, 149, 246)"
                height="14"
                role="img"
                viewBox="0 0 45 45"
                width="14"
              >
                <title>Verificado</title>
                <path
                  d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
            <p className="text-center text-sm text-stone-600 dark:text-stone-200">
              {description}
            </p>
          </div>
        </div>
      </nav>
      <nav
        className={cn(
          "bg-[length:700px_700px] bg-center bg-no-repeat object-contain sm:bg-none ",
          `top-0 mx-auto hidden w-full max-w-7xl flex-col items-center justify-between gap-6 sm:block lg:mx-0 lg:justify-between lg:px-0 lg:py-6`,
        )}
      >
        <div
          className={`flex h-96 w-full items-end justify-center bg-gradient-to-t from-white to-transparent lg:h-auto dark:from-black`}
        >
          <div className="flex flex-col items-center justify-center gap-2 p-6">
            <div className="hidden sm:block">
              <Avatar className="h-32 w-32 rounded-full border-2 border-black dark:border-white">
                <AvatarImage src={cover} className="object-cover" />
                <AvatarFallback className="from bg-gradient-to-tr from-[#FF95C8] to-[#F7FF7C] font-semibold text-stone-700" />
              </Avatar>
            </div>
            <div className="flex items-center justify-center gap-2">
              <h1 className="font-title text-2xl text-stone-700 dark:text-white">
                {name}
              </h1>
              <svg
                fill="rgb(0, 149, 246)"
                height="14"
                role="img"
                viewBox="0 0 45 45"
                width="14"
              >
                <title>Verificado</title>
                <path
                  d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
            <p className="text-center text-sm text-stone-600 dark:text-stone-200">
              {description}
            </p>
          </div>
        </div>
      </nav>
    </>
  );
}
