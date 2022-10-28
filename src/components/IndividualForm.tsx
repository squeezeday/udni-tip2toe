import { useStateMachine } from 'little-state-machine';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import updateAction from '../actions/updateAction';
import {
  KaryotypicSex,
  Sex,
} from '../interfaces/phenopackets/schema/v2/core/individual';
import steps from '../utils/steps';

interface IFormData {
  id: string;
}

export default function IndividualForm() {
  const navigate = useNavigate();
  const { actions, state } = useStateMachine({ updateAction });

  const save = async (id: string) => {
    await actions.updateAction({
      ...state,
      phenoPacket: {
        ...state.phenoPacket,
        subject: {
          id,
          alternateIds: [],
          dateOfBirth: undefined,
          gender: undefined,
          karyotypicSex: KaryotypicSex.UNKNOWN_KARYOTYPE,
          sex: Sex.UNKNOWN_SEX,
          taxonomy: undefined,
          timeAtLastEncounter: undefined,
          vitalStatus: undefined,
        },
      },
    });
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({ defaultValues: state.phenoPacket.subject });

  const doSubmit = async ({ id }: IFormData) => {
    save(id);
    navigate(steps[1].url);
  };
  return (
    <form onSubmit={handleSubmit(doSubmit)} className="mt-5">
      <label htmlFor="id" className="">
        UDP ID
      </label>
      <input
        type="text"
        id="id"
        {...register('id', { required: 'Required' })}
        placeholder="ID"
        className="block p-2 rounded border border-gray-300 shadow-sm focus:border-udni-teal focus:ring-4 focus:outline-none focus:ring-udni-teal-100"
      />
      {errors?.id && <p className="text-red-500">{errors.id.message}</p>}
      <button
        type="submit"
        className="border rounded p-2 px-6 my-2 border-udni-teal text-udni-teal uppercase text-sm font-bold hover:bg-udni-teal hover:text-white"
      >
        Save
      </button>
    </form>
  );
}
