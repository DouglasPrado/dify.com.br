"use client";

import { ScheduleForm } from "./schedule-form";

export default function CreateExplorerCalendarModal() {
  return (
    <div className="flex w-full flex-col gap-4 rounded-2xl bg-white p-6 shadow md:max-w-3xl dark:bg-black dark:md:border-stone-700">
      <div className="">
        <h2 className="text-start font-cal text-xl text-stone-700 dark:text-white">
          Agendar o conteúdo
        </h2>
      </div>
      <div className="relative flex flex-col">
        <ScheduleForm />
      </div>
    </div>
  );
}
