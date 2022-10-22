/* eslint-disable */
import type { OntologyClass, Procedure, TimeElement } from "./base";

export const protobufPackage = "org.phenopackets.schema.v2.core";

/** FHIR mapping: Observation (https://www.hl7.org/fhir/observation.html) */
export interface Measurement {
  /**
   * Free-text description of the feature. Note this is not a acceptable place to document/describe the phenotype -
   * the type and onset etc... fields should be used for this purpose.
   */
  description: string;
  /**
   * An ontology class which describes the assay used to produce the measurement.
   * For example "body temperature" (CMO:0000015) or
   * "Platelets [#/volume] in Blood" (LOINC:26515-7)
   * FHIR mapping: Observation.code
   */
  assay: OntologyClass | undefined;
  value: Value | undefined;
  complexValue:
    | ComplexValue
    | undefined;
  /** The time at which the measurement was made */
  timeObserved:
    | TimeElement
    | undefined;
  /** Clinical procedure performed on the subject in order to produce the measurement. */
  procedure: Procedure | undefined;
}

/**  */
export interface Value {
  quantity:
    | Quantity
    | undefined;
  /** for use with things such as categories 'red', 'yellow' or 'absent'/'present' */
  ontologyClass: OntologyClass | undefined;
}

export interface ComplexValue {
  /**
   * The quantities required to fully describe the complex value. For example the systolic and diastolic blood pressure
   * quantities
   */
  typedQuantities: TypedQuantity[];
}

export interface Quantity {
  /** For instance, NCIT subhierarchy, Unit of Measure (Code C25709), https://www.ebi.ac.uk/ols/ontologies/uo */
  unit:
    | OntologyClass
    | undefined;
  /** the  value of the quantity in the units  e.g. 2.0 mg */
  value: number;
  /**
   * Reference range for the quantity
   * e.g. The normal range of platelets is 150,000 to 450,000 platelets/uL.
   */
  referenceRange: ReferenceRange | undefined;
}

/**
 * For complex measurements, such as blood pressure where more than one component quantity is required to describe the
 * measurement
 */
export interface TypedQuantity {
  /** e.g. diastolic, systolic */
  type:
    | OntologyClass
    | undefined;
  /** e.g. mm Hg */
  quantity: Quantity | undefined;
}

export interface ReferenceRange {
  unit: OntologyClass | undefined;
  low: number;
  high: number;
}
