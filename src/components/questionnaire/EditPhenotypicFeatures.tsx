import { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { OntologyClass } from '../../interfaces/phenopackets/schema/v2/core/base';
import { PhenotypicFeature } from '../../interfaces/phenopackets/schema/v2/core/phenotypic_feature';
import tip2toeForm from '../../tip2toeform';
import { YesNoUnknown } from '../../types';
import { lookupHpoTerm } from '../../utils/lookupHpoTerm';
import AddCustomTerm, { AddCustomTermFormModel } from './form/AddCustomTerm';
import EditPhenotypicFeature from './form/EditPhenotypicFeature';
import NavButtons from './form/NavButtons';

interface IProps {
  slug: string;
  ontologies?: OntologyClass[];
}
export default function EditPhenotypicFeatures({ slug, ontologies }: IProps) {
  const { state, dispatch } = useContext(AppContext);

  const save = async (ontology: OntologyClass, value: YesNoUnknown) => {
    if (value === 'unknown')
      dispatch({
        type: 'REMOVE_PHENOTYPIC_FEATURE',
        payload: { ontologyTypeId: ontology.id },
      });
    else
      dispatch({
        type: 'SET_PHENOTYPIC_FEATURE',
        payload: {
          type: ontology,
          excluded: value === 'no',
        },
      });
  };

  const setAllValues = async (value: YesNoUnknown) => {
    let phenotypicFeatures = [];
    if (value === 'unknown') {
      phenotypicFeatures = [
        ...(state.phenoPacket?.phenotypicFeatures?.filter(
          (st) => ontologies?.some((sf) => sf.id === st.type?.id) === false,
        ) || []),
      ];
      dispatch({
        type: 'SET_PHENOTYPIC_FEATURES',
        payload: phenotypicFeatures,
      });
    } else {
      phenotypicFeatures = [
        ...(state.phenoPacket?.phenotypicFeatures?.filter(
          (st) => ontologies?.some((sf) => sf.id === st.type?.id) === false,
        ) || []),
        ...(ontologies?.map(
          (x) =>
            ({
              type: {
                id: x.id,
                label: x.label,
              },
              description: '',
              evidence: [],
              excluded: value === 'no',
              modifiers: [],
              onset: undefined,
              resolution: undefined,
              severity: undefined,
            } as PhenotypicFeature),
        ) || []),
      ];
      dispatch({
        type: 'SET_PHENOTYPIC_FEATURES',
        payload: phenotypicFeatures,
      });
    }
  };

  const [message, setMessage] = useState<string | undefined>();

  const onAddCustomTerm = async ({ term }: AddCustomTermFormModel) => {
    setMessage(`Looking up term ${term}...`);
    // check duplicate
    const ontology = ontologies?.find((x) => x.id === term);
    if (ontology) {
      // setSelectedTerms((values) => [
      //   ...(values?.filter((x) => x.id !== term) ?? []),
      //   { term, value: 'yes' },
      // ]);
      save(ontology, 'yes');
      setMessage(`Added ${term}: ${ontology.label}`);
      return;
    }
    // check if this term is available in some other formSection
    const foundSection = tip2toeForm.formSections?.find((x) =>
      x.ontologies?.some((st) => st.id === term),
    );
    if (foundSection) {
      setMessage(
        `The term ${term} exists in formSection ${foundSection.title}`,
      );
      return;
    }

    // lookup hpo term
    try {
      const { error, label } = await lookupHpoTerm(term);
      if (error) {
        setMessage(error);
      } else {
        // add hpo term
        save({ id: term, label: label || '' }, 'yes');
        setMessage(undefined);
      }
    } catch (error) {
      setMessage('Unable to lookup HPO term at this time');
    }
  };
  const getYesNoUnknown = (
    phenotypicFeature?: PhenotypicFeature,
  ): YesNoUnknown => {
    if (phenotypicFeature?.excluded === true) return 'no';
    if (phenotypicFeature?.excluded === false) return 'yes';
    return 'unknown';
  };
  if (!ontologies) {
    return <></>;
  }
  return (
    <>
      <div className="inline-flex my-2 text-xs border rounded border-slate-300 text-slate-500">
        <button
          className="flex items-center p-2 hover:bg-white hover:text-gray-700"
          onClick={() => setAllValues('no')}
        >
          Normal
        </button>
        <button
          className="flex items-center p-2 border-l hover:bg-white hover:text-gray-700"
          onClick={() => setAllValues('unknown')}
        >
          Abnormal
        </button>
        <button
          className="flex items-center p-2 border-l hover:bg-white hover:text-gray-700"
          onClick={() => setAllValues('unknown')}
        >
          Not investigated
        </button>
        {/* <button className="btn ml-auto hidden md:flex" onClick={onNext}>
      Next <ChevronRightIcon className="w-4 ml-1" />
    </button> */}
      </div>
      <fieldset className="mt-4 divide-y divide-gray-300">
        {ontologies
          ?.filter((x) => x.id !== 'other')
          .map((ontology) => (
            <div key={`feature-${ontology.id}`} className="py-4">
              <EditPhenotypicFeature
                ontology={ontology}
                value={getYesNoUnknown(
                  state?.phenoPacket?.phenotypicFeatures?.find(
                    (x) => x.type?.id === ontology.id,
                  ),
                )}
                onChange={(value) => {
                  save(ontology, value);
                }}
              />
            </div>
          ))}
        {ontologies
          ?.filter((x) => x.id === 'other')
          .map(({ label }) => (
            <div className="py-4" key={`chk-other`}>
              <p className="my-2">{label}</p>
              <AddCustomTerm onSubmit={onAddCustomTerm} key={`act-${slug}`} />
              {message && (
                <p
                  key={`act-msg-${slug}`}
                  onClick={() => setMessage(undefined)}
                >
                  {message}
                </p>
              )}

              <div className="mt-4 divide-y divide-gray-300">
                {state.phenoPacket?.phenotypicFeatures
                  ?.filter(
                    (st) =>
                      ontologies?.some((sf) => sf.id === st.type?.id) ===
                        false && st.description === slug,
                  )
                  .map((pf, i) => {
                    if (!pf.type) return null;
                    return (
                      <EditPhenotypicFeature
                        key={`et-${pf.type?.id}-${i}`}
                        ontology={pf.type}
                        value={getYesNoUnknown(
                          state?.phenoPacket?.phenotypicFeatures?.find(
                            (x) => x.type?.id === pf.type?.id,
                          ),
                        )}
                        onChange={(value) => {
                          if (pf.type) save(pf.type, value);
                        }}
                      />
                    );
                  })}
              </div>
            </div>
          ))}
      </fieldset>
      <NavButtons />
    </>
  );
}
