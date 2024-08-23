"use client";
import StepForm from "@/components/form/launch/step-form";
import StepsForm from "@/components/form/launch/steps-form";
import { Progress } from "@/components/ui/progress";
import { useHandleForm } from "@/lib/hooks/use-handle-form";
import { motion as m } from "framer-motion";
export default function StartedPage() {
  const { step, next, prev, goto } = useHandleForm([
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
  ]);

  return (
    <m.main
      initial={{ y: "-100%" }}
      animate={{ y: "0%" }}
      className="mx-auto flex h-screen w-full flex-col gap-6 md:flex-row"
    >
      <StepsForm step={step} />
      <m.div
        variants={containerButton}
        initial="hidden"
        animate="show"
        className="flex h-full w-full max-w-4xl flex-col gap-4 p-12 "
      >
        <m.div
          initial={{ opacity: 0, y: "-100%" }}
          animate={{
            opacity: 1,
            y: "0%",
            transition: {
              ease: "easeInOut",
              duration: 1.2,
              delay: 0.1,
            },
          }}
        >
          <Progress value={step * (100 / 13)} className="h-1" />
        </m.div>
        <StepForm step={step} next={next} prev={prev} goto={goto} />
      </m.div>
    </m.main>
  );
}

const containerButton = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.25,
      staggerChildren: 0.25,
    },
  },
};
