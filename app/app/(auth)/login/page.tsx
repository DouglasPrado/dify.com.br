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
      <p className="mt-2 text-center text-sm text-stone-600 dark:text-stone-400">
        Plataforma de gerenciamento de produtos <br />
        <a
          className="font-medium text-black hover:text-stone-800 dark:text-stone-300 dark:hover:text-stone-100"
          href="https://vercel.com/blog/platforms-starter-kit"
          rel="noreferrer"
          target="_blank"
        >
          leia mais.
        </a>
      </p>

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
