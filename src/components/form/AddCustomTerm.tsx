import { PlusIcon } from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';

export interface AddCustomTermFormModel {
  term: string;
}
interface IProps {
  onSubmit: (formData: AddCustomTermFormModel) => void;
}
export default function AddCustomTerm({ onSubmit }: IProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddCustomTermFormModel>();

  const doSubmit = async (formData: AddCustomTermFormModel) => {
    onSubmit(formData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(doSubmit)}>
      <fieldset className="flex">
        <input
          type="text"
          className="w-full border-2 border-slate-400 rounded p-1 px-2 mr-2 focus:outline-none active:outline-none"
          placeholder="HP:0000000"
          autoComplete="off"
          {...register('term', {
            pattern: {
              value: /HP\:\d{1,7}$/,
              message: 'Must match HP:1234567',
            },
            required: true,
          })}
        />
        <button className="btn rounded" type="submit">
          <PlusIcon className="w-4 h-4" /> Add
        </button>
      </fieldset>
      <p className="text-red-500 basis-full">{errors?.term?.message}</p>
      <p>
        Read more at{' '}
        <a href="https://hpo.jax.org/app/" target="_blank">
          hpo.jax.org
        </a>
      </p>
    </form>
  );
}
