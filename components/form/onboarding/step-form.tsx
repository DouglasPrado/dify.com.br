import { motion as m } from "framer-motion";
import Link from "next/link";
import CountryForm from "./step01/country-form";
import HoursForm from "./step01/hours-form";
import InvestmentForm from "./step01/investment-form";
import NewBusinessForm from "./step01/new-business-form";
import TeamForm from "./step01/team-form";
import TypeForm from "./step01/type-form";
import ColorsForm from "./step02/colors-form";
import LogoForm from "./step02/logo-form";
import NameForm from "./step02/name-form";
import TomForm from "./step02/tom-form";
import MarketingForm from "./step03/marketing-form";
import NicheForm from "./step03/niche-form";
import DescriptionForm from "./step04/description-form";
import FinishForm from "./step05/finish-form";

export default function StepForm({ step, next, prev, goto }: any) {
  return (
    <>
      {/* STEP 01 */}
      {step === 0 && <NewBusinessForm step={step + 1} />}
      {step === 1 && <CountryForm step={step + 1} />}
      {step === 2 && <TypeForm step={step + 1} />}
      {step === 3 && <HoursForm step={step + 1} />}
      {step === 4 && <InvestmentForm step={step + 1} />}
      {step === 5 && <TeamForm step={step + 1} />}

      {/* STEP 02 */}
      {step === 6 && <NameForm step={step + 1} />}
      {step === 7 && <ColorsForm step={step + 1} />}
      {step === 8 && <LogoForm step={step + 1} />}
      {step === 9 && <TomForm step={step + 1} />}

      {/* STEP 03 */}
      {step === 10 && <NicheForm step={step + 1} />}
      {step === 11 && <MarketingForm step={step + 1} />}

      {/* STEP 04 */}
      {step === 12 && <DescriptionForm step={step + 1} />}
      {step === 13 && <FinishForm step={step + 1} />}

      {step < 13 ? (
        <div className="flex justify-between">
          <m.button
            className="rounded-md border bg-stone-100 px-6 py-2 text-sm text-stone-700 hover:border-black hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:border-none disabled:bg-stone-200"
            onClick={prev}
            whileHover="hover"
            whileTap="tap"
            disabled={step === 0}
          >
            {"Voltar"}
          </m.button>

          <m.button
            className="rounded-md border bg-black px-6 py-2 text-sm text-white hover:border-black hover:bg-white hover:text-black"
            onClick={next}
            whileHover="hover"
            whileTap="tap"
          >
            {"Próximo"}
          </m.button>
        </div>
      ) : null}
    </>
  );
}
