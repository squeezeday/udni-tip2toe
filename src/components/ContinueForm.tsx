import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface IFormData {
  id: string;
}

export default function ContinueForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>();

  const doSubmit = async ({ id }: IFormData) => {
    navigate(`/documents/${id}`);
    // const url = `${import.meta.env.VITE_APIURL}/api/v1/phenopacket/${id}`;
    // const ret = await fetch(url, {
    //   method: 'GET',
    //   headers: { Accept: 'application/json' },
    // });
    // if (ret.ok) {
    //   navigate(`/documents/${id}`);
    // }
  };
  return (
    <form onSubmit={handleSubmit(doSubmit)} className="mt-5">
      <label htmlFor="id" className="sr-only">
        Phenopacket ID
      </label>
      <input
        type="text"
        id="id"
        autoComplete="off"
        {...register('id', { required: 'Required' })}
        placeholder="Phenopacket ID"
        className="block p-2 rounded border border-gray-300 shadow-sm focus:border-udni-teal focus:ring-4 focus:outline-none focus:ring-udni-teal-100"
      />
      {errors?.id && <p className="text-red-500">{errors.id.message}</p>}
      <button
        type="submit"
        className="border rounded p-3 px-6 my-2 border-udni-teal text-udni-teal uppercase text-sm font-bold hover:bg-udni-teal hover:text-white"
      >
        Continue
      </button>
    </form>
  );
}
