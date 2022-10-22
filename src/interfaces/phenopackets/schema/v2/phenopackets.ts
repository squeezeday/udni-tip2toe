/* eslint-disable */
import type { File } from "./core/base";
import type { Biosample } from "./core/biosample";
import type { Disease } from "./core/disease";
import type { Individual } from "./core/individual";
import type { Interpretation } from "./core/interpretation";
import type { Measurement } from "./core/measurement";
import type { MedicalAction } from "./core/medical_action";
import type { MetaData } from "./core/meta_data";
import type { Pedigree } from "./core/pedigree";
import type { PhenotypicFeature } from "./core/phenotypic_feature";

export const protobufPackage = "org.phenopackets.schema.v2";

/**
 * An anonymous phenotypic description of an individual or biosample with potential genes of interest and/or diagnoses.
 *
 * This is a bundle of high-level concepts with no specifically defined relational concepts. It is expected that the
 * resources sharing the phenopackets will define and enforce their own semantics and level of requirements for included
 * fields.
 */
export interface Phenopacket {
  /** An identifier specific for this phenopacket. */
  id: string;
  /** The individual representing the focus of this packet - e.g. the proband in rare disease cases or cancer patient */
  subject:
    | Individual
    | undefined;
  /** Phenotypic features relating to the subject of the phenopacket */
  phenotypicFeatures: PhenotypicFeature[];
  /** Quantifiable measurements related to the individual */
  measurements: Measurement[];
  /** Biosample(s) derived from the patient or a collection of biosamples in isolation */
  biosamples: Biosample[];
  interpretations: Interpretation[];
  /**
   * Field for disease identifiers - could be used for listing either diagnosed or suspected conditions. The
   * resources using these fields should define what this represents in their context.
   */
  diseases: Disease[];
  medicalActions: MedicalAction[];
  /** Pointer to the relevant file(s) for the individual */
  files: File[];
  /** Structured definitions of the resources and ontologies used within the phenopacket. REQUIRED */
  metaData: MetaData | undefined;
}

/**
 * Phenotype, sample and pedigree data required for a genomic diagnosis.
 * Equivalent to the Genomics England InterpretationRequestRD
 * https://github.com/genomicsengland/GelReportModels/blob/master/schemas/IDLs/org.gel.models.report.avro/5.0.0/InterpretationRequestRD.avdl
 */
export interface Family {
  /** An identifier specific for this family. */
  id: string;
  /** The individual representing the focus of this packet - e.g. the proband in rare disease cases or cancer patient */
  proband:
    | Phenopacket
    | undefined;
  /**
   * Individuals related in some way to the patient. For instance, the individuals may be genetically related or may
   * be members of a cohort. If this field is used, then  it is expected that a pedigree will be included for
   * genetically related individuals for use cases such as genomic diagnostics. If a phenopacket is being used to
   * describe one member of a cohort, then in general one phenopacket will be created for each of the individuals in
   * the cohort.
   */
  relatives: Phenopacket[];
  /** flag to indicate that the parents of the proband are consanguinous */
  consanguinousParents: boolean;
  /**
   * The pedigree defining the relations between the proband and their relatives. Pedigree.individual_id should
   * map to the PhenoPacket.Individual.id
   */
  pedigree:
    | Pedigree
    | undefined;
  /**
   * Pointer to the relevant file(s) for the family. These should be files relating to one or more of the family
   * members e.g a multi-sample VCF. Files relating exclusively to individual phenopackets should be contained in the
   * Phenopacket.
   */
  files: File[];
  /** Structured definitions of the resources and ontologies used within the phenopacket. REQUIRED */
  metaData: MetaData | undefined;
}

/** A group of individuals related in some phenotypic or genotypic aspect. */
export interface Cohort {
  id: string;
  description: string;
  members: Phenopacket[];
  /**
   * Pointer to relevant file(s) for the cohort. Files relating exclusively to individual phenopackets should be
   * contained in the Phenopacket.
   */
  files: File[];
  /** Structured definitions of the resources and ontologies used within the phenopacket. REQUIRED */
  metaData: MetaData | undefined;
}
