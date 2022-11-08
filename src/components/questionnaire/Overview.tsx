import { ChevronUpIcon } from '@heroicons/react/24/solid';
import { PhenotypicFeature } from '../../interfaces/phenopackets/schema/v2/core/phenotypic_feature';
import { IFormSection } from '../../types';
import { Disclosure } from '@headlessui/react';
import tip2toeForm from '../../tip2toeform';
import NavButtons from './form/NavButtons';
import Ontology from '../phenopacket/Ontology';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

export default function Overview() {
  const { state } = useContext(AppContext);

  return (
    <>
      {tip2toeForm.formSections?.map((section) => {
        return (
          <Disclosure key={section.slug}>
            {({ open }) => (
              <>
                <Disclosure.Button
                  className={` flex w-full items-center justify-between  rounded ${
                    open ? 'bg-udni-teal text-white p-2' : 'py-1 pr-2'
                  }`}
                >
                  <span>{section.title}</span>
                  <ChevronUpIcon
                    className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 `}
                  />
                </Disclosure.Button>
                <Disclosure.Panel className="bg-white p-2">
                  {section.ontologies ? (
                    <SectionPhenotypicFeatures
                      key={`summary-${section.title}`}
                      formSection={section}
                      phenotypicFeatures={
                        state?.phenoPacket?.phenotypicFeatures
                      }
                    />
                  ) : null}
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        );
      })}

      <NavButtons />
    </>
  );
}

interface ISectionPhenotypicFeaturesProps {
  formSection: IFormSection;
  phenotypicFeatures?: PhenotypicFeature[];
}
function SectionPhenotypicFeatures({
  formSection,
  phenotypicFeatures,
}: ISectionPhenotypicFeaturesProps) {
  const sectionOntologyIds: string[] =
    formSection.ontologies?.filter((x) => x.id !== 'other').map((x) => x.id) ||
    [];

  const filteredPhenotypicFeatures = phenotypicFeatures?.filter(
    (x) =>
      sectionOntologyIds.some((st) => st === x.type?.id) ||
      x.description === formSection.slug,
  );

  return (
    <section className="my-4">
      <div className="md:flex flex-row">
        <div className="md:w-1/3">
          <h4>Abnormal</h4>
          {filteredPhenotypicFeatures
            ?.filter((x) => !x.excluded)
            .map((pf, i) => (
              <Ontology key={`st-${i}`} ontology={pf.type} />
            ))}
        </div>
        <div className="md:w-1/3">
          <h4>Normal</h4>
          {filteredPhenotypicFeatures
            ?.filter((x) => x.excluded)
            .map((pf, i) => (
              <Ontology key={`st-${i}`} ontology={pf.type} />
            ))}
        </div>
        <div className="md:w-1/3 text-slate-400">
          <h4>Not investigated</h4>
          {formSection?.ontologies
            ?.filter(
              (x) =>
                x.id !== 'other' &&
                !filteredPhenotypicFeatures?.some((pf) => pf.type?.id === x.id),
            )
            .map((ontology, i) => (
              <Ontology key={`st-${i}`} ontology={ontology} />
            ))}
        </div>
      </div>
    </section>
  );
}
