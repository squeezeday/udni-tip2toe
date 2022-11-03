import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

import { Phenopacket } from '../interfaces/phenopackets/schema/v2/phenopackets';
import Spinner from './common/Spinner';

interface IFormData {
  id: string;
  password: string;
}

export default function ContinueForm() {
  const navigate = useNavigate();
  const [error, setError] = useState<undefined | string>();
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  const doSubmit = async ({ id }: IFormData) => {
    try {
      setLoading(true);
      const url = `${import.meta.env.VITE_APIURL}/api/v1/phenopacket/${id}`;
      const ret = await fetch(url, {
        method: 'GET',
        headers: { Accept: 'application/json' },
      });
      if (ret.ok) {
        const phenoPacket: Partial<Phenopacket> = await ret.json();
        dispatch({ type: 'SET_PHENOPACKET', payload: phenoPacket });
        navigate(`/questionnaire`);
      } else {
        setError('Phenopacket not found');
      }
    } catch (error) {
      setError('Unable to load phenopacket');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!import.meta.env.VITE_APIURL) {
    return (
      <div>
        <p>API Unavailable</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(doSubmit)} className="mt-5">
      <label htmlFor="id" className="">
        Phenopacket ID
      </label>
      <input
        type="text"
        id="id"
        autoComplete="off"
        {...register('id', { required: 'Required' })}
        placeholder=""
        className="block p-2 rounded border border-gray-300 shadow-sm focus:border-udni-teal focus:ring-4 focus:outline-none focus:ring-udni-teal-100"
      />
      {errors?.id && <p className="text-red-500">{errors.id.message}</p>}
      <label htmlFor="password" className="">
        Password
      </label>
      <input
        type="password"
        id="password"
        autoComplete="off"
        {...register('password', { required: 'Required' })}
        className="block p-2 rounded border border-gray-300 shadow-sm focus:border-udni-teal focus:ring-4 focus:outline-none focus:ring-udni-teal-100"
      />
      {errors?.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="border rounded p-3 px-6 my-2 border-udni-teal text-udni-teal uppercase text-sm font-bold hover:bg-udni-teal hover:text-white"
      >
        Continue {loading && <Spinner />}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
