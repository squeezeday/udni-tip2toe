/* eslint-disable */
import type { Sex } from "./individual";

export const protobufPackage = "org.phenopackets.schema.v2.core";

/** https://software.broadinstitute.org/gatk/documentation/article?id=11016 */
export interface Pedigree {
  persons: Pedigree_Person[];
}

export interface Pedigree_Person {
  familyId: string;
  individualId: string;
  paternalId: string;
  maternalId: string;
  sex: Sex;
  affectedStatus: Pedigree_Person_AffectedStatus;
}

export enum Pedigree_Person_AffectedStatus {
  MISSING = 0,
  UNAFFECTED = 1,
  AFFECTED = 2,
  UNRECOGNIZED = -1,
}
