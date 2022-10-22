import { Phenopacket } from './interfaces/phenopackets/schema/v2/phenopackets';

export type YesNoUnknown = 'yes' | 'no' | 'unknown';

export interface IQuestion {
  label: string;
  term: string;
}
export interface ISection {
  chapter: string;
  features: IQuestion[];
  slug: string;
}

export interface IIndividual {
  id?: string;
}
export interface IGlobalState {
  phenoPacket: Phenopacket;
}
export interface IFormData {
  [key: string]: ISectionResponse;
}

export interface ITermValue {
  term: string;
  label?: string;
  value: YesNoUnknown;
}
export interface ISectionResponse {
  terms: ITermValue[];
  customTerms: string[];
}

export type PhenopacketEntity = Phenopacket & {
  _id: string;
  _hash: string;
};

export interface UploadedFile {
  _id: string;
  name: string;
  size: number;
  mimetype: string;
  url: string;
  section?: string;
}
