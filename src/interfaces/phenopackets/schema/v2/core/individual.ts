/* eslint-disable */
import type { OntologyClass, TimeElement } from "./base";

export const protobufPackage = "org.phenopackets.schema.v2.core";

/**
 * Sex of an individual
 * FHIR mapping: AdministrativeGender (https://www.hl7.org/fhir/codesystem-administrative-gender.html)
 */
export enum Sex {
  /** UNKNOWN_SEX - Not assessed / available. */
  UNKNOWN_SEX = 0,
  /** FEMALE - Female */
  FEMALE = 1,
  /** MALE - Male */
  MALE = 2,
  /** OTHER_SEX - It is not possible, to accurately assess the applicability of MALE/FEMALE. */
  OTHER_SEX = 3,
  UNRECOGNIZED = -1,
}

/** Karyotypic sex of the individual */
export enum KaryotypicSex {
  UNKNOWN_KARYOTYPE = 0,
  XX = 1,
  XY = 2,
  XO = 3,
  XXY = 4,
  XXX = 5,
  XXYY = 6,
  XXXY = 7,
  XXXX = 8,
  XYY = 9,
  OTHER_KARYOTYPE = 10,
  UNRECOGNIZED = -1,
}

/**
 * An individual (or subject) typically corresponds to an individual human or another organism.
 * FHIR mapping: Patient (https://www.hl7.org/fhir/patient.html).
 */
export interface Individual {
  /**
   * An identifier for the individual. This must be unique within the record.
   * ARGO mapping donor::submitter_donor_id
   */
  id: string;
  /**
   * An optional list of alternative identifiers for this individual. This field is provided
   * for the convenience of users who may have multiple mappings to an individual which they need to track.
   */
  alternateIds: string[];
  /**
   * The date of birth of the individual as an ISO8601 UTC timestamp - rounded down to the closest known
   * year/month/day/hour/minute
   * e.g. "2018-03-01T00:00:00Z" for someone born on an unknown day in March 2018
   * or "2018-01-01T00:00:00Z" for someone born on an unknown day in 2018
   * or empty if unknown/ not stated.
   */
  dateOfBirth:
    | Date
    | undefined;
  /**
   * An TimeElement object describing the age of the individual at the last time of collection. The Age object allows the encoding
   * of the age either as ISO8601 duration or time interval (preferred), or as ontology term object.
   * See http://build.fhir.org/datatypes
   */
  timeAtLastEncounter:
    | TimeElement
    | undefined;
  /**
   * Vital status of the individual. If not present it is assumed that the individual is alive. If present it will
   * default to 'false' i.e. the individual was alive when the data was collected.
   * ARGO mapping donor::vital_status
   */
  vitalStatus:
    | VitalStatus
    | undefined;
  /**
   * The phenotypic sex of the individual
   * ARGO mapping sample_registration::gender (this is complicated as ARGO only have male/female/other which maps to the phenopacket Sex field)
   */
  sex: Sex;
  /** The karyotypic sex of the individual */
  karyotypicSex: KaryotypicSex;
  /** Self-identified gender */
  gender:
    | OntologyClass
    | undefined;
  /**
   * NCBI taxonomic identifier NCBITaxon e.g. NCBITaxon:9606 or NCBITaxon:1337
   * For resources where there may be more than one organism being studied it is advisable to indicate the taxonomic
   * identifier of that organism, to its most specific level
   */
  taxonomy: OntologyClass | undefined;
}

export interface VitalStatus {
  status: VitalStatus_Status;
  timeOfDeath:
    | TimeElement
    | undefined;
  /** ARGO mapping donor::cause_of_death */
  causeOfDeath:
    | OntologyClass
    | undefined;
  /** ARGO mapping donor::survival_time */
  survivalTimeInDays: number;
}

/** Default = false i.e. the individual is alive. MUST be true if */
export enum VitalStatus_Status {
  UNKNOWN_STATUS = 0,
  ALIVE = 1,
  DECEASED = 2,
  UNRECOGNIZED = -1,
}
