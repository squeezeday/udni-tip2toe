import { OntologyClass } from './interfaces/phenopackets/schema/v2/core/base';
import { Phenopacket } from './interfaces/phenopackets/schema/v2/phenopackets';

export type YesNoUnknown = 'yes' | 'no' | 'unknown';
export type QuestionType =
  | 'text'
  | 'longText'
  | 'number'
  | 'select'
  | 'selectMultiple'
  | 'date';
export interface IQuestion {
  title: string;
  name: string;
  type: QuestionType;
  options?: string[];
}
export interface IForm {
  title: string;
  formSections?: IFormSection[];
}
export interface IFormSection {
  title: string;
  ontologies?: OntologyClass[];
  slug: string;
  description?: string;
  questions?: IQuestion[];
  uploadSections?: string[];
}

export interface IIndividual {
  id?: string;
}
export interface IGlobalState {
  phenoPacket: Phenopacket;
}
export type PhenopacketEntity = Phenopacket & {
  _id: string;
  _hash: string;
};

export interface UploadedFile {
  _id: string;
  name: string;
  size: number;
  mimeType: string;
  url: string;
}

export interface ICustomFormData {
  [key: string]: string;
  // motherAge: number;
  // fatherAge: number;
  // ethnicity:
  //   | 'African'
  //   | 'American'
  //   | 'Asian'
  //   | 'European'
  //   | 'Latino'
  //   | 'Middle'
  //   | 'East'
  //   | 'Oceanian'
  //   | 'Unknown';
  // referringUdp?: string;
  // clinicalFindings: string;
  // caregivers: string;
  // favourite: string;
  // dontLike: string;
  // happy: string;
  // worried: string;
  // needHelpWith: string;
  // canDo: string;
  // sleep: string;
  // eat: string;
  // medical: string;
}

export interface PhenopacketDate {
  seconds: number;
}
