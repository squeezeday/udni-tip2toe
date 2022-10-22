import { GlobalState } from 'little-state-machine';

export default function resetAction(state: GlobalState, payload: GlobalState) {
  return { phenoPacket: {}, files: [] };
}
