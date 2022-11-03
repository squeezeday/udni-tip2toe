import PhenotypicFeaturesList from '../summary/PhenotypicFeaturesList';
import { PrinterIcon } from '@heroicons/react/24/outline';
import tip2toeForm from '../../tip2toeform';
import ViewFormSection from './ViewFormSection';
import ViewIndividual from './ViewIndividual';
import NavButtons from './form/NavButtons';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

export default function Summary() {
  const { state } = useContext(AppContext);

  return (
    <>
      <button
        onClick={() => window.print()}
        className="ml-auto print:hidden flex items-center border rounded p-2 px-4  border-udni-teal text-udni-teal uppercase text-sm font-bold hover:bg-udni-teal hover:text-white"
      >
        <PrinterIcon className="w-4 h-4 mr-2" />
        Print
      </button>
      <ViewFormSection slug="photographs" />
      <ViewFormSection
        slug="this-is-me"
        customFormData={state.customFormData || {}}
      />
      <h2 style={{ pageBreakBefore: 'always' }}>
        This is {state.phenoPacket.subject?.id}
      </h2>
      {state.phenoPacket.subject ? (
        <ViewIndividual
          individual={state.phenoPacket.subject}
          customFormData={state.customFormData}
        />
      ) : null}
      <ViewFormSection
        slug="clinical-findings"
        customFormData={state.customFormData || {}}
      />
      <section>
        <h2>HPO Summary</h2>
        <h3>Phenotypic features</h3>
        <PhenotypicFeaturesList
          phenotypicFeatures={state.phenoPacket.phenotypicFeatures?.filter(
            (x) => !x.excluded,
          )}
        />
        <PhenotypicFeaturesList
          phenotypicFeatures={state.phenoPacket.phenotypicFeatures?.filter(
            (x) => x.excluded,
          )}
        />
      </section>

      {tip2toeForm.formSections
        ?.filter(
          (x) =>
            x.questions?.length &&
            x.slug !== 'clinical-findings' &&
            x.slug !== 'this-is-me',
        )
        .map((formSection) => {
          return (
            <ViewFormSection
              formSection={formSection}
              key={formSection.slug}
              customFormData={state.customFormData || {}}
            />
          );
        })}
      <NavButtons />
    </>
  );
}
