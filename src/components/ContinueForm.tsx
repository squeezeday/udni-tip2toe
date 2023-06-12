import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Phenopacket } from '../interfaces/phenopackets/schema/v2/phenopackets';
import Spinner from './common/Spinner';
import { ICustomFormData } from '../types';

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

  const doSubmit = async ({ id, password }: IFormData) => {
    try {
      dispatch({ type: 'CLEAR' });
      setLoading(true);
      const phenopacketUrl = `${
        import.meta.env.VITE_APIURL
      }/api/v1/phenopacket/${id}`;
      const formDataUrl = `${
        import.meta.env.VITE_APIURL
      }/api/v1/formdata/${id}?password=${password}`;
      const [phenopacketRet, customFormDataRet] = await Promise.all([
        fetch(phenopacketUrl, {
          method: 'GET',
          headers: { Accept: 'application/json' },
        }),
        fetch(formDataUrl, {
          method: 'GET',
          headers: { Accept: 'application/json' },
        }),
      ]);
      if (phenopacketRet.ok) {
        const phenoPacket: Partial<Phenopacket> = await phenopacketRet.json();

        if (customFormDataRet.ok) {
          const customFormData: ICustomFormData =
            await customFormDataRet.json();
          dispatch({
            type: 'CONTINUE_FORM',
            payload: { phenoPacket, customFormData },
          });
          navigate(`/questionnaire`);
        } else if (customFormDataRet.status === 404) {
          setError('Warning! Phenopacket found but no associated custom data.');
        } else if (customFormDataRet.status === 403) {
          setError('Invalid password');
        } else if (customFormDataRet.status === 500) {
          setError('API server error');
        }
      } else if (phenopacketRet.status === 404) {
        setError('Phenopacket not found');
      } else if (phenopacketRet.status === 403) {
        setError('Unauthorized');
      } else if (phenopacketRet.status === 500) {
        setError('API server error');
      } else {
        setError('Unknown error');
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
