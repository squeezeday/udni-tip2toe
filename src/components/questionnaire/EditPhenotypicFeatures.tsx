import { useStateMachine } from 'little-state-machine';
import { useState } from 'react';
import updateAction from '../../actions/updateAction';
import { PhenotypicFeature } from '../../interfaces/phenopackets/schema/v2/core/phenotypic_feature';
import tip2toeForm from '../../tip2toeform';
import { IFormSection, YesNoUnknown } from '../../types';
import { lookupHpoTerm } from '../../utils/lookupHpoTerm';
import AddCustomTerm, { AddCustomTermFormModel } from './form/AddCustomTerm';
import EditPhenotypicFeature from './form/EditPhenotypicFeature';
import NavButtons from './form/NavButtons';

interface IProps {
  formSection: IFormSection;
}
export default function EditPhenotypicFeatures({ formSection }: IProps) {
  const { actions, state } = useStateMachine({ updateAction });

  const save = async (
    ontologyTypeId: string,
    value: YesNoUnknown,
    label?: string,
  ) => {
    const phenotypicFeatures =
      state.phenoPacket.phenotypicFeatures?.filter(
        (x) => x.type?.id !== ontologyTypeId,
      ) ?? [];
    if (value !== 'unknown')
      phenotypicFeatures.push({
        type: {
          id: ontologyTypeId,
          label:
            label ??
            formSection?.ontologies?.find((x) => x.id === ontologyTypeId)
              ?.label ??
            '',
        },
        description: formSection?.ontologies?.some(
          (x) => x.id === ontologyTypeId,
        )
          ? ''
          : formSection?.slug ?? '', // handle custom term: save formSection.. TODO: better implementation needed
        evidence: [],
        excluded: value === 'no',
        modifiers: [],
        onset: undefined,
        resolution: undefined,
        severity: undefined,
      });

    await actions.updateAction({
      ...state,
      phenoPacket: { ...state.phenoPacket, phenotypicFeatures },
    });
  };

  const setAllValues = async (value: YesNoUnknown) => {
    let phenotypicFeatures = [];
    if (value === 'unknown') {
      phenotypicFeatures = [
        ...(state.phenoPacket?.phenotypicFeatures?.filter(
          (st) =>
            formSection?.ontologies?.some((sf) => sf.id === st.type?.id) ===
            false,
        ) || []),
      ];
      await actions.updateAction({
        ...state,
        phenoPacket: { ...state.phenoPacket, phenotypicFeatures },
      });
    } else {
      phenotypicFeatures = [
        ...(state.phenoPacket?.phenotypicFeatures?.filter(
          (st) =>
            formSection?.ontologies?.some((sf) => sf.id === st.type?.id) ===
            false,
        ) || []),
        ...(formSection?.ontologies?.map(
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
      await actions.updateAction({
        ...state,
        phenoPacket: { ...state.phenoPacket, phenotypicFeatures },
      });
    }
  };

  const [message, setMessage] = useState<string | undefined>();

  const onAddCustomTerm = async ({ term }: AddCustomTermFormModel) => {
    setMessage(`Looking up term ${term}...`);
    // check duplicate
    const feature = formSection?.ontologies?.find((x) => x.id === term);
    if (feature) {
      // setSelectedTerms((values) => [
      //   ...(values?.filter((x) => x.id !== term) ?? []),
      //   { term, value: 'yes' },
      // ]);
      save(term, 'yes');
      setMessage(`Added ${term}: ${feature.label}`);
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
        save(term, 'yes', label);
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
      {formSection && (
        <fieldset className="mt-4 divide-y divide-gray-300">
          {formSection?.ontologies
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
                    save(ontology.id, value);
                  }}
                />
              </div>
            ))}
          {formSection?.ontologies
            ?.filter((x) => x.id === 'other')
            .map(({ label }) => (
              <div className="py-4" key={`chk-other`}>
                <p className="my-2">{label}</p>
                <AddCustomTerm
                  onSubmit={onAddCustomTerm}
                  key={`act-${formSection?.slug}`}
                />
                {message && (
                  <p
                    key={`act-msg-${formSection?.slug}`}
                    onClick={() => setMessage(undefined)}
                  >
                    {message}
                  </p>
                )}

                <div className="mt-4 divide-y divide-gray-300">
                  {state.phenoPacket?.phenotypicFeatures
                    ?.filter(
                      (st) =>
                        formSection?.ontologies?.some(
                          (sf) => sf.id === st.type?.id,
                        ) === false && st.description === formSection?.slug,
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
                            save(pf.type?.id || '', value, pf.type?.label);
                          }}
                        />
                      );
                    })}
                </div>
              </div>
            ))}
        </fieldset>
      )}
      <NavButtons />
    </>
  );
}
