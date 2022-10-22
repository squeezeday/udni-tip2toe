import { useStateMachine } from 'little-state-machine';
import updateAction from '../actions/updateAction';
import {
  KaryotypicSex,
  Sex,
} from '../interfaces/phenopackets/schema/v2/core/individual';

export default function Individual() {
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

  return (
    <>
      <h2>Individual</h2>
      <fieldset className="">
        <label htmlFor="id" className="block my-2">
          UDP ID
        </label>
        <input
          type="text"
          className="w-full max-w-sm border-2 border-slate-400 rounded p-1 px-2 mr-2 focus:outline-none active:outline-none"
          placeholder="UDP ID"
          id="id"
          autoComplete="off"
          onBlur={(e) => save(e.target.value)}
          defaultValue={state.phenoPacket?.subject?.id}
        />
      </fieldset>
    </>
  );
}
