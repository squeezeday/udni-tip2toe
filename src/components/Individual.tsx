import { useStateMachine } from 'little-state-machine';
import updateAction from '../actions/updateAction';
import {
  KaryotypicSex,
  Sex,
} from '../interfaces/phenopackets/schema/v2/core/individual';
import IndividualForm from './IndividualForm';

export default function Individual() {
  return (
    <>
      <h2>Individual</h2>
      <IndividualForm />
    </>
  );
}
