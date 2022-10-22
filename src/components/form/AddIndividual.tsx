import { ChevronRightIcon, PlusIcon } from '@heroicons/react/24/solid';
import { useForm } from 'react-hook-form';

export interface IAddIndividualFormModel {
  id: string;
}
interface IProps {
  defaultValues?: IAddIndividualFormModel;
  onSubmit: (formData: IAddIndividualFormModel) => void;
}
export default function AddIndividual({ onSubmit, defaultValues }: IProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IAddIndividualFormModel>({ defaultValues });

  const doSubmit = async (formData: IAddIndividualFormModel) => {
    onSubmit(formData);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(doSubmit)}>
      <fieldset className="mx-auto max-w-sm">
        <div className="">
          <label htmlFor="id" className="block my-2">
            UDP ID
          </label>
          <input
            type="text"
            className="w-full max-w-sm border-2 border-slate-400 rounded p-1 px-2 mr-2 focus:outline-none active:outline-none"
            placeholder="UDP ID"
            id="id"
            autoComplete="off"
            {...register('id', {
              required: 'Required field',
              minLength: 3,
            })}
          />
          <p className="text-red-500 basis-full">{errors?.id?.message}</p>
        </div>
        <button type="submit" className="btn self-end ml-auto my-4">
          Next <ChevronRightIcon className="w-4" />
        </button>
      </fieldset>
    </form>
  );
}
