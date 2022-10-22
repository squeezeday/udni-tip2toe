import { GlobalState } from 'little-state-machine';

export default function updateAction(state: GlobalState, payload: GlobalState) {
  return {
    ...state,
    ...payload,
  };
}
