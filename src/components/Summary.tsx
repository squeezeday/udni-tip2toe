import { useStateMachine } from 'little-state-machine';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRightIcon } from '@heroicons/react/24/solid';
import resetAction from '../actions/resetAction';
import updateAction from '../actions/updateAction';
import { File as PhenopacketFile } from '../interfaces/phenopackets/schema/v2/core/base';
import { PhenotypicFeature } from '../interfaces/phenopackets/schema/v2/core/phenotypic_feature';
import { Phenopacket } from '../interfaces/phenopackets/schema/v2/phenopackets';
import sections from '../sections';
import { PhenopacketEntity, ISection } from '../types';
import UploadedFiles from './files/UploadedFiles';
import PhenotypicFeaturesList from './PhenotypicFeaturesList';
import { Tab } from '@headlessui/react';

interface ISummaryFormModel {
  acceptTerms: boolean;
}

export default function Summary() {
  const { actions, state } = useStateMachine({ updateAction, resetAction });
  const navigate = useNavigate();
  const [showFullForm, setShowFullForm] = useState(false);
  const [phenoPacket, setPhenoPacket] = useState<
    PhenopacketEntity | undefined
  >();

  const {
    handleSubmit,
    reset,
    register,
    formState: { isSubmitSuccessful, isSubmitted, isSubmitting, isValid },
  } = useForm<ISummaryFormModel>({ mode: 'onChange' });

  const resetForm = async () => {
    if (confirm('Clear form data?')) {
      reset();
      await actions.resetAction();
      navigate('/');
    }
  };

  const onSubmit = async () => {
    const data: Partial<Phenopacket> = {
      ...state.phenoPacket,
      files: state.files.map(
        (file) =>
          ({
            uri: file.url,
          } as PhenopacketFile),
      ),
      metaData: {
        created: new Date(),
        createdBy: 'UDNI frontend',
        submittedBy: 'UDNI frontend',
        updates: [],
        externalReferences: [],
        phenopacketSchemaVersion: 'v2',
        resources: [
          {
            id: 'hp',
            url: 'http://purl.obolibrary.org/obo/hp.owl',
            iriPrefix: 'http://purl.obolibrary.org/obo/HP_',
            namespacePrefix: 'HP',
            name: 'human phenotype ontology',
            version: '',
          },
        ],
      },
    };

    if (import.meta.env.VITE_APIURL) {
      const url = `${import.meta.env.VITE_APIURL}/api/v1/phenopacket`;
      const ret = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      });
      reset();
      await actions.resetAction();
      setPhenoPacket(await ret.json());
    }
  };

  const getSubmissionStatus = () => {
    return (
      <>
        {isSubmitting ? (
          <p className="bg-blue-100 text-blue-500 p-4 rounded">
            Submitting form..
          </p>
        ) : null}
        {isSubmitted && isSubmitSuccessful ? (
          <p className="bg-blue-100 text-blue-500 p-4 rounded">
            Your form has been submitted successfully and was assigned ID{' '}
            {phenoPacket?._id}
          </p>
        ) : null}
        {!isSubmitSuccessful && isSubmitted && !isSubmitting ? (
          <p className="bg-red-100 text-red-500 p-4 rounded">
            Unable to submit form at this time.
          </p>
        ) : null}
      </>
    );
  };

  return (
    <>
      {getSubmissionStatus()}
      {phenoPacket ? (
        <div>
          <Link
            to={`/phenopacket/${phenoPacket?._id}`}
            className="btn inline-block my-4"
          >
            View phenopacket
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <h2>UDP ID</h2>
            <p>{state.phenoPacket.subject?.id}</p>
          </div>
          <UploadedFiles section="" />
          <div className="my-2">
            <Tab.Group>
              <Tab.List className="flex bg-gray-50 rounded p-2 space-x-2">
                <Tab
                  className={({ selected }) =>
                    `w-full p-2 rounded ${
                      selected ? 'bg-udni-teal text-white' : 'bg-gray-100'
                    }`
                  }
                >
                  Abnormal features
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `w-full rounded p-2 ${
                      selected ? 'bg-udni-teal text-white' : 'bg-gray-100'
                    }`
                  }
                >
                  View full form
                </Tab>
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <section className="my-4">
                    <h3>Abnormal phenotypic features</h3>
                    <PhenotypicFeaturesList
                      phenotypicFeatures={state.phenoPacket.phenotypicFeatures?.filter(
                        (x) => !x.excluded,
                      )}
                    />
                  </section>
                </Tab.Panel>
                <Tab.Panel>
                  <section>
                    {sections.map((section) => {
                      return (
                        <SectionSummary
                          key={`summary-${section.chapter}`}
                          section={section}
                          // sectionData={sectionData}
                          phenotypicFeatures={
                            state?.phenoPacket?.phenotypicFeatures
                          }
                        />
                      );
                    })}
                  </section>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>

            <div className=" rounded bg-white p-4 my-4">
              <label className="inline-block my-2">
                <input
                  type="checkbox"
                  {...register('acceptTerms', { required: true })}
                  className="mr-2 accent-udni-teal"
                />
                I accept terms and conditions
              </label>

              <button
                className="btn block "
                type="submit"
                disabled={
                  !isValid ||
                  isSubmitting ||
                  !state.phenoPacket?.phenotypicFeatures
                }
              >
                {isSubmitting ? 'Submitting form...' : 'Submit form'}
              </button>
            </div>
            <button
              className="text-xs border rounded-full p-2 text-slate-500 hover:text-slate-700"
              onClick={async (e) => {
                e.preventDefault();
                resetForm();
              }}
            >
              Reset form
            </button>
          </div>
          {getSubmissionStatus()}
        </form>
      )}
    </>
  );
}

interface ISectionSummaryProps {
  section: ISection;
  phenotypicFeatures?: PhenotypicFeature[];
}
function SectionSummary({ section, phenotypicFeatures }: ISectionSummaryProps) {
  const sectionTerms = section.features
    .filter((x) => x.term !== 'other')
    .map((x) => x.term);

  const filteredPhenotypicFeatures = phenotypicFeatures?.filter(
    (x) =>
      sectionTerms.some((st) => st === x.type?.id) ||
      x.description === section.slug,
  );

  return (
    <section className="my-4">
      <Link to={`/form/step/${section.slug}`}>
        <h3 className=" text-udni-teal py-2 flex items-center justify-between border-b-2 border-udni-teal">
          <span>{section.chapter}</span>
          <ChevronRightIcon className="h-4 w-4 " />
        </h3>
      </Link>
      <div className="md:flex flex-row">
        <div className="md:w-1/3">
          <h4>Abnormal</h4>
          {filteredPhenotypicFeatures
            ?.filter((x) => !x.excluded)
            .map((pf, i) => (
              <div key={`st-${i}`}>
                <p>
                  <strong>{pf.type?.id}</strong> {pf.type?.label}
                </p>
              </div>
            ))}
        </div>
        <div className="md:w-1/3">
          <h4>Normal</h4>
          {filteredPhenotypicFeatures
            ?.filter((x) => x.excluded)
            .map((pf, i) => (
              <div key={`st-${i}`}>
                <p>
                  <strong>{pf.type?.id}</strong> {pf.type?.label}
                </p>
              </div>
            ))}
        </div>
        <div className="md:w-1/3 text-slate-400">
          <h4>Not investigated</h4>
          {section.features
            ?.filter(
              (x) =>
                x.term !== 'other' &&
                !filteredPhenotypicFeatures?.some(
                  (pf) => pf.type?.id === x.term,
                ),
            )
            .map((f, i) => (
              <div key={`st-${i}`}>
                <p>
                  <strong>{f.term}</strong> {f.label}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
