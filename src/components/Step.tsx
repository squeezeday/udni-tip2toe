import { MinusCircleIcon } from '@heroicons/react/24/solid';
import { useStateMachine } from 'little-state-machine';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import updateAction from '../actions/updateAction';
import { PhenotypicFeature } from '../interfaces/phenopackets/schema/v2/core/phenotypic_feature';
import sections from '../sections';
import { ISection, YesNoUnknown } from '../types';
import lookupHpoTerm from '../utils/lookupHpoTerm';
import AddCustomTerm, { AddCustomTermFormModel } from './form/AddCustomTerm';
import Feature from './form/Feature';

export default function Step() {
  const { actions, state } = useStateMachine({ updateAction });
  const { slug } = useParams();

  const [section, setSection] = useState<ISection | undefined>(undefined);

  useEffect(() => {
    const i = Number(sections.findIndex((x) => x.slug === slug));
    if (i >= 0) setSection(sections[i]);
  }, [slug]);

  const save = async (term: string, value: YesNoUnknown, label?: string) => {
    const phenotypicFeatures =
      state.phenoPacket.phenotypicFeatures?.filter(
        (x) => x.type?.id !== term,
      ) ?? [];
    if (value !== 'unknown')
      phenotypicFeatures.push({
        type: {
          id: term,
          label:
            label ??
            section?.features.find((x) => x.term === term)?.label ??
            '',
        },
        description: section?.features.some((x) => x.term === term)
          ? ''
          : section?.slug ?? '', // handle custom term: save section.. TODO: better implementation needed
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
  const removeTerm = async (term: string) => {
    const phenotypicFeatures =
      state.phenoPacket.phenotypicFeatures?.filter(
        (x) => x.type?.id !== term,
      ) ?? [];
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
            section?.features.some((sf) => sf.term === st.type?.id) === false,
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
            section?.features.some((sf) => sf.term === st.type?.id) === false,
        ) || []),
        ...(section?.features.map(
          (x) =>
            ({
              type: {
                id: x.term,
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
    const feature = section?.features.find((x) => x.term === term);
    if (feature) {
      // setSelectedTerms((values) => [
      //   ...(values?.filter((x) => x.term !== term) ?? []),
      //   { term, value: 'yes' },
      // ]);
      save(term, 'yes');
      setMessage(`Added ${term}: ${feature.label}`);
      return;
    }
    // check if this term is available in some other section
    const foundSection = sections.find((x) =>
      x.features.some((st) => st.term === term),
    );
    if (foundSection) {
      setMessage(`The term ${term} exists in section ${foundSection.chapter}`);
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
      <h2>{section?.chapter}</h2>

      <div className="inline-flex my-2 text-xs border rounded border-slate-300 text-slate-500">
        <button
          className="flex items-center p-2 hover:bg-gray-200"
          onClick={() => setAllValues('no')}
        >
          Normal
        </button>
        <button
          className="flex items-center p-2 border-l hover:bg-gray-200"
          onClick={() => setAllValues('unknown')}
        >
          Abnormal
        </button>
        <button
          className="flex items-center p-2 border-l hover:bg-gray-200"
          onClick={() => setAllValues('unknown')}
        >
          Not investigated
        </button>
        {/* <button className="btn ml-auto hidden md:flex" onClick={onNext}>
      Next <ChevronRightIcon className="w-4 ml-1" />
    </button> */}
      </div>
      {section && (
        <fieldset className="border-t mt-4">
          {section?.features
            .filter((x) => x.term !== 'other')
            .map((feature) => (
              <Feature
                question={feature}
                key={`feature-${feature.term}`}
                value={
                  //selectedTerms?.find((x) => x.term === feature.term)?.value ??
                  getYesNoUnknown(
                    state?.phenoPacket?.phenotypicFeatures?.find(
                      (x) => x.type?.id === feature.term,
                    ),
                  )
                }
                onChange={(value) => {
                  save(feature.term, value);
                }}
              />
            ))}
          {section?.features
            .filter((x) => x.term === 'other')
            .map((feature) => (
              <div className="py-2 my-1" key={`chk-other`}>
                <p className="my-2">{feature.label}</p>
                <AddCustomTerm
                  onSubmit={onAddCustomTerm}
                  key={`act-${section?.slug}`}
                />
                {message && (
                  <p
                    key={`act-msg-${section?.slug}`}
                    onClick={() => setMessage(undefined)}
                  >
                    {message}
                  </p>
                )}

                {state.phenoPacket?.phenotypicFeatures
                  ?.filter(
                    (st) =>
                      section?.features.some(
                        (sf) => sf.term === st.type?.id,
                      ) === false && st.description === section?.chapter,
                  )
                  .map((pf, i) => (
                    <div className="flex my-1" key={`et-${pf.type?.id}-${i}`}>
                      <p>
                        <strong>{pf.type?.id}</strong> {pf.type?.label}
                      </p>
                      <button
                        className=""
                        onClick={() => removeTerm(pf.type?.id || '')}
                      >
                        <MinusCircleIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
              </div>
            ))}
        </fieldset>
      )}
    </>
  );
}
