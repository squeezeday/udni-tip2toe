import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { Phenopacket } from '../../interfaces/phenopackets/schema/v2/phenopackets';
import { PhenopacketEntity } from '../../types';
import Spinner from '../common/Spinner';

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
    const dto: Partial<Phenopacket> = {
      ...state.phenoPacket,
      metaData: {
        // protobuf timestamp hack
        created: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          seconds: new Date().getTime(),
        },
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

    // protobuf timestamp hack
    if (dto.subject?.dateOfBirth) {
      dto.subject.dateOfBirth = {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        seconds: new Date(dto.subject.dateOfBirth).getTime(),
      };
    }

    const VITE_APIURL = import.meta.env.VITE_APIURL;
    if (VITE_APIURL) {
      const res = await fetch(`${VITE_APIURL}/api/v1/phenopacket`, {
        method: 'POST',
        body: JSON.stringify(dto),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        throw new Error('Error submitting phenopacket');
      }

      const ret = (await res.json()) as PhenopacketEntity;
      setPhenoPacket(ret);

      await fetch(`${VITE_APIURL}/api/v1/formdata`, {
        method: 'POST',
        body: JSON.stringify({
          ...state.customFormData,
          phenopacketId: ret._id,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
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
            <br/>Your phenopacket is available for fetching from the backend with hash{' '}
            {phenoPacket?._hash}
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
    <div className="print:hidden">
      {getSubmissionStatus()}
      {phenoPacket ? (
        <>
          <Link
            className=" my-2 inline-flex border rounded p-2 px-4  border-udni-teal text-udni-teal uppercase text-sm font-bold hover:bg-udni-teal hover:text-white"
            to="/"
            onClick={() => {
              reset();
              dispatch({ type: 'CLEAR' });
            }}
          >
            Clear form and go to front page{' '}
            <ChevronRightIcon className="w-4 ml-1 flex-none" />
          </Link>
        </>
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
              {isSubmitting ? 'Submitting form... ' : 'Submit form'}
              {isSubmitting && <Spinner />}
            </button>
          </div>
          <button
            className="text-xs border p-2 border-gray-400 text-gray-400 hover:text-gray-700 hover:border-gray-700 rounded"
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
    </div>
  );
}
