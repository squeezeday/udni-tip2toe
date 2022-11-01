import 'little-state-machine';
import { Phenopacket } from './interfaces/phenopackets/schema/v2/phenopackets';
import { ICustomFormData, UploadedFile } from './types';

declare module 'little-state-machine' {
  interface GlobalState {
    phenoPacket: Partial<Phenopacket>;
    files: UploadedFile[];
    customFormData?: ICustomFormData;
  }
}
