/* eslint-disable */
import type { GeneDescriptor, VariationDescriptor } from "../../../../ga4gh/vrsatile/v1/vrsatile";
import type { OntologyClass } from "./base";

export const protobufPackage = "org.phenopackets.schema.v2.core";

export enum AcmgPathogenicityClassification {
  NOT_PROVIDED = 0,
  BENIGN = 1,
  LIKELY_BENIGN = 2,
  UNCERTAIN_SIGNIFICANCE = 3,
  LIKELY_PATHOGENIC = 4,
  PATHOGENIC = 5,
  UNRECOGNIZED = -1,
}

export enum TherapeuticActionability {
  UNKNOWN_ACTIONABILITY = 0,
  NOT_ACTIONABLE = 1,
  ACTIONABLE = 2,
  UNRECOGNIZED = -1,
}

export interface Interpretation {
  /** id of the interpretation */
  id: string;
  progressStatus: Interpretation_ProgressStatus;
  /** The diagnosis made in this interpretation */
  diagnosis: Diagnosis | undefined;
  summary: string;
}

export enum Interpretation_ProgressStatus {
  UNKNOWN_PROGRESS = 0,
  IN_PROGRESS = 1,
  COMPLETED = 2,
  SOLVED = 3,
  UNSOLVED = 4,
  UNRECOGNIZED = -1,
}

export interface Diagnosis {
  /**
   * The disease/condition assigned to the diagnosis.Details about this disease may be contained in the `diseases`
   * field in the Phenopacket.
   */
  disease:
    | OntologyClass
    | undefined;
  /** genomic features containing the status of their contribution towards the diagnosis */
  genomicInterpretations: GenomicInterpretation[];
}

/**
 * A statement about the contribution of a genomic element towards the observed phenotype. Note that this does not intend
 * to encode any knowledge or results of specific computations.
 */
export interface GenomicInterpretation {
  /**
   * identifier for the subject of the interpretation. This MUST be the individual id or a biosample id of the
   * enclosing phenopacket.
   */
  subjectOrBiosampleId: string;
  interpretationStatus: GenomicInterpretation_InterpretationStatus;
  gene: GeneDescriptor | undefined;
  variantInterpretation: VariantInterpretation | undefined;
}

export enum GenomicInterpretation_InterpretationStatus {
  UNKNOWN_STATUS = 0,
  REJECTED = 1,
  CANDIDATE = 2,
  CONTRIBUTORY = 3,
  CAUSATIVE = 4,
  UNRECOGNIZED = -1,
}

export interface VariantInterpretation {
  acmgPathogenicityClassification: AcmgPathogenicityClassification;
  therapeuticActionability: TherapeuticActionability;
  variationDescriptor: VariationDescriptor | undefined;
}
