"use client";

import { Calendar } from "@/components/ui/calendar";
import { ptBR } from "date-fns/locale";
import * as React from "react";

export function CalendarSelect() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const bookedDays = [new Date(2024, 2, 8), new Date(2024, 2, 12)];
  const bookedStyle = { border: "2px solid currentColor" };
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      locale={ptBR}
      modifiers={{ booked: bookedDays }}
      modifiersStyles={{ booked: bookedStyle }}
      className="flex w-full items-center justify-center rounded-md border shadow"
    />
  );
}
