/* eslint-disable */
import type { Evidence, OntologyClass, TimeElement } from "./base";

export const protobufPackage = "org.phenopackets.schema.v2.core";

/**
 * An individual phenotypic feature, observed as either present or absent (negated), with possible onset, modifiers and
 * frequency
 * FHIR mapping: Condition (https://www.hl7.org/fhir/condition.html) or Observation (https://www.hl7.org/fhir/observation.html)
 */
export interface PhenotypicFeature {
  /**
   * Free-text description of the phenotype. Note this is not a acceptable place to document/describe the phenotype -
   * the type and onset etc... fields should be used for this purpose.
   */
  description: string;
  /**
   * The primary ontology class which describes the phenotype. For example "HP:0001363"  "Craniosynostosis"
   * FHIR mapping: Condition.identifier
   */
  type:
    | OntologyClass
    | undefined;
  /**
   * Flag to indicate whether the phenotype was observed or not. Default is 'false', in other words the phenotype was
   * observed. Therefore it is only required in cases to indicate that the phenotype was looked for, but found to be
   * absent.
   * More formally, this modifier indicates the logical negation of the OntologyClass used in the 'type' field.
   * *CAUTION* It is imperative to check this field for correct interpretation of the phenotype!
   */
  excluded: boolean;
  /**
   * Severity of the condition e.g. subclasses of HP:0012824-Severity or SNOMED:272141005-Severities
   * FHIR mapping: Condition.severity
   */
  severity:
    | OntologyClass
    | undefined;
  /** subclasses of HP:0012823 ! Clinical modifier apart from Severity HP:0012824 - Severity */
  modifiers: OntologyClass[];
  /**
   * the values of this will come from the HPO onset hierarchy
   * i.e. subclasses of HP:0003674
   * FHIR mapping: Condition.onset
   */
  onset: TimeElement | undefined;
  resolution:
    | TimeElement
    | undefined;
  /** Evidences for how the phenotype was determined. */
  evidence: Evidence[];
}
