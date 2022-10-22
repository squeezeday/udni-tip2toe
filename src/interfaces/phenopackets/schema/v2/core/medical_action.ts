/* eslint-disable */
import type { ExternalReference, OntologyClass, Procedure, TimeElement, TimeInterval } from "./base";
import type { Quantity } from "./measurement";

export const protobufPackage = "org.phenopackets.schema.v2.core";

/** A simplified version of ODHSI-DRUG_EXPOSURE */
export enum DrugType {
  UNKNOWN_DRUG_TYPE = 0,
  PRESCRIPTION = 1,
  EHR_MEDICATION_LIST = 2,
  ADMINISTRATION_RELATED_TO_PROCEDURE = 3,
  UNRECOGNIZED = -1,
}

/** medication, procedure, other actions taken for clinical management */
export interface MedicalAction {
  procedure: Procedure | undefined;
  treatment: Treatment | undefined;
  radiationTherapy: RadiationTherapy | undefined;
  therapeuticRegimen:
    | TherapeuticRegimen
    | undefined;
  /**
   * The condition or disease that this treatment was intended to address.
   * FHIR mapping Procedure::reasonCode
   */
  treatmentTarget:
    | OntologyClass
    | undefined;
  /**
   * Whether the intention of the treatment was curative, palliative,
   * ARGO mapping treatment::treatment_intent
   */
  treatmentIntent:
    | OntologyClass
    | undefined;
  /** ARGO mapping treatment::response_to_treatment */
  responseToTreatment:
    | OntologyClass
    | undefined;
  /** ARGO mapping treatment::adverse_events */
  adverseEvents: OntologyClass[];
  /** ARGO mapping treatment::treatment_outcome */
  treatmentTerminationReason: OntologyClass | undefined;
}

/** treatment with an agent, such as a drug */
export interface Treatment {
  /** for instance, DrugCentral, RxNorm Drugbank concept */
  agent:
    | OntologyClass
    | undefined;
  /** For instance, NCIT subhierarchy: Route of Administration (Code C38114) */
  routeOfAdministration: OntologyClass | undefined;
  doseIntervals: DoseInterval[];
  drugType: DrugType;
  /** ARGO mapping chemotherapy::cumulative_drug_dosage */
  cumulativeDose: Quantity | undefined;
}

/** e.g. 50mg/ml 3 times daily for two weeks */
export interface DoseInterval {
  quantity: Quantity | undefined;
  scheduleFrequency: OntologyClass | undefined;
  interval: TimeInterval | undefined;
}

/** RadiationTherapy */
export interface RadiationTherapy {
  /**
   * The modality of radiation therapy (e.g., electron, photon,…). REQUIRED.
   * ARGO mapping radiation::radiation_therapy_modality
   */
  modality:
    | OntologyClass
    | undefined;
  /**
   * The anatomical site where radiation therapy was administered. REQUIRED.
   * ARGO mapping radiation::anatomical_site_irradiated
   */
  bodySite:
    | OntologyClass
    | undefined;
  /**
   * The total dose given in units of Gray (Gy). REQUIRED.
   * ARGO mapping radiation::radiation_therapy_dosage
   */
  dosage: number;
  /**
   * The total number of fractions delivered as part of treatment. REQUIRED.
   * ARGO mapping radiation::radiation_therapy_fractions
   */
  fractions: number;
}

export interface TherapeuticRegimen {
  externalReference: ExternalReference | undefined;
  ontologyClass:
    | OntologyClass
    | undefined;
  /** possibly undefined; */
  startTime:
    | TimeElement
    | undefined;
  /** end time can be empty which would indicate ongoing */
  endTime: TimeElement | undefined;
  regimenStatus: TherapeuticRegimen_RegimenStatus;
}

export enum TherapeuticRegimen_RegimenStatus {
  UNKNOWN_STATUS = 0,
  STARTED = 1,
  COMPLETED = 2,
  DISCONTINUED = 3,
  UNRECOGNIZED = -1,
}
