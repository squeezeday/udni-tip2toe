import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { File as PhenopacketFile } from '../../interfaces/phenopackets/schema/v2/core/base';
import { Phenopacket } from '../../interfaces/phenopackets/schema/v2/phenopackets';
import { PhenopacketEntity } from '../../types';

interface ISummaryFormModel {
  acceptTerms: boolean;
}

export default function SubmitForm() {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
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
      dispatch({ type: 'CLEAR' });
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
            fileAttributes: { description: file.section },
            individualToFileIdentifiers: {},
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
      dispatch({ type: 'CLEAR' });
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
          <div className="md:flex  my-4">
            <label className="inline-block my-2 mr-4">
              <input
                type="checkbox"
                {...register('acceptTerms', { required: true })}
                className="mr-2 accent-udni-teal"
              />
              I accept terms and conditions
            </label>
            <button
              className="border rounded px-6 mt-5 border-udni-teal text-udni-teal uppercase text-sm font-bold hover:bg-udni-teal hover:text-white disabled:text-gray-400 disabled:border-gray-400 p-2 block ml-auto"
              type="submit"
              disabled={
                !isValid ||
                isSubmitting ||
                !state.phenoPacket?.subject?.id?.length ||
                !state.phenoPacket?.phenotypicFeatures?.length
              }
            >
              {isSubmitting ? 'Submitting form...' : 'Submit form'}
            </button>
          </div>
          <button
            className="text-xs  text-slate-500 hover:text-slate-700"
            onClick={async (e) => {
              e.preventDefault();
              resetForm();
            }}
          >
            Reset form
          </button>
          {getSubmissionStatus()}
        </form>
      )}
    </>
  );
}
