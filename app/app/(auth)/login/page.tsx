import Image from "next/image";
import { Suspense } from "react";
import LoginGithubButton from "./login-github-button";
import LoginGoogleButton from "./login-google-button";

export default function LoginPage() {
  return (
    <div className="mx-5 border border-stone-200 py-10 sm:mx-auto sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-md dark:border-stone-700">
      <Image
        alt="Platforms Starter Kit"
        width={100}
        height={100}
        className="relative mx-auto h-12 w-auto dark:scale-110 dark:rounded-full dark:border dark:border-stone-400"
        src="/logo.png"
      />
      <h1 className="mt-6 text-center font-title text-3xl dark:text-white">
        Teste produtos
        <br /> em menos de 15 minutos.
      </h1>

      <div className="mx-auto mt-4 w-11/12 max-w-xs sm:w-full">
        <Suspense
          fallback={
            <div className="my-2 h-10 w-full rounded-md border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
          }
        >
          <LoginGithubButton />
          <LoginGoogleButton />
        </Suspense>
      </div>
    </div>
  );
}
