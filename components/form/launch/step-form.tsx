import { motion as m } from "framer-motion";
import CountryForm from "./step01/country-form";
import DescriptionForm from "./step01/description-form";
import NameForm from "./step01/name-form";
import SubjectForm from "./step01/subject-form";
import TomForm from "./step01/tom-form";
import KeywordsForm from "./step02/keywords-form";
import ReferencesForm from "./step02/references-form";
import TopicsForm from "./step02/topics-form";
import BannerForm from "./step03/banner-form";
import CollectionsForm from "./step03/collections-form";
import ConfigsForm from "./step03/configs-form";
import HighlightForm from "./step03/highlight-form";
import RelationshipsForm from "./step03/relationships-form";
import FinishForm from "./step04/finish-form";

export default function StepForm({ step, next, prev, goto }: any) {
  return (
    <>
      {/* STEP 01 */}
      {step === 0 && <SubjectForm step={step + 1} />}
      {step === 2 && <NameForm step={step + 1} />}
      {step === 1 && <CountryForm step={step + 1} />}
      {step === 3 && <DescriptionForm step={step + 1} />}
      {step === 4 && <TomForm step={step + 1} />}

      {/* STEP 02 */}
      {step === 5 && <ReferencesForm step={step + 1} />}
      {step === 6 && <TopicsForm step={step + 1} />}
      {step === 7 && <KeywordsForm step={step + 1} />}

      {/* STEP 03 */}
      {step === 8 && <HighlightForm step={step + 1} />}
      {step === 9 && <BannerForm step={step + 1} />}
      {step === 10 && <CollectionsForm step={step + 1} />}
      {step === 11 && <RelationshipsForm step={step + 1} />}
      {step === 12 && <ConfigsForm step={step + 1} />}

      {/* STEP 04 */}
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
