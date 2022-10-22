/* eslint-disable */
import type { File, OntologyClass, Procedure, TimeElement } from "./base";
import type { Measurement } from "./measurement";
import type { PhenotypicFeature } from "./phenotypic_feature";

export const protobufPackage = "org.phenopackets.schema.v2.core";

/**
 * A Biosample refers to a unit of biological material from which the substrate
 * molecules (e.g. genomic DNA, RNA, proteins) for molecular analyses (e.g.
 * sequencing, array hybridisation, mass-spectrometry) are extracted. Examples
 * would be a tissue biopsy, a single cell from a culture for single cell genome
 * sequencing or a protein fraction from a gradient centrifugation.
 * Several instances (e.g. technical replicates) or types of experiments (e.g.
 * genomic array as well as RNA-seq experiments) may refer to the same Biosample.
 * FHIR mapping: Specimen (http://www.hl7.org/fhir/specimen.html).
 */
export interface Biosample {
  /**
   * The Biosample id This is unique in the
   * context of the server instance.
   * ARGO mapping specimen::submitter_specimen_id
   */
  id: string;
  /**
   * The id of the individual this biosample was derived from.
   * ARGO mapping specimen::submitter_donor_id
   */
  individualId: string;
  /** The id of the parent biosample this biosample was derived from. */
  derivedFromId: string;
  /**
   * The biosample's description. This attribute contains human readable text.
   * The "description" attributes should not contain any structured data.
   */
  description: string;
  /**
   * UBERON class describing the tissue from which the specimen was collected.
   * PDX-MI mapping: 'Specimen tumor tissue'
   * FHIR mapping: Specimen.type
   * ARGO mapping sample_registration::specimen_tissue_source
   */
  sampledTissue:
    | OntologyClass
    | undefined;
  /**
   * Recommended use of EFO term to describe the sample.
   * e.g. Amplified DNA, ctDNA, Total RNA, Lung tissue, Cultured cells...
   * ARGO mapping sample_registration::sample_type
   */
  sampleType:
    | OntologyClass
    | undefined;
  /** Phenotypic characteristics of the BioSample, for example histological findings of a biopsy. */
  phenotypicFeatures: PhenotypicFeature[];
  measurements: Measurement[];
  /** NCBI taxonomic identifier (NCBITaxon) of the sample e.g. NCBITaxon:9606 */
  taxonomy:
    | OntologyClass
    | undefined;
  /**
   * An TimeElement describing either the age of the individual this biosample was
   * derived from at the time of collection, or the time itself.
   * See http://build.fhir.org/datatypes
   */
  timeOfCollection:
    | TimeElement
    | undefined;
  /**
   * This is the pathologist’s diagnosis and may often represent a refinement of the clinical diagnosis given in the
   * Patient/Clinical module. Should use the same terminology as diagnosis, but represent the pathologist’s findings.
   * Normal samples would be tagged with the term "NCIT:C38757", "Negative Finding"
   * ARGO mapping specimen::tumour_histological_type
   */
  histologicalDiagnosis:
    | OntologyClass
    | undefined;
  /**
   * Is the specimen tissue from the primary tumor, a metastasis or a recurrence?
   * Most likely a child term of NCIT:C7062 (Neoplasm by Special Category)
   * NCIT:C3677 (Benign Neoplasm)
   * NCIT:C84509 (Primary Malignant Neoplasm)
   * NCIT:C95606 (Second Primary Malignant Neoplasm)
   * NCIT:C3261 (Metastatic Neoplasm)
   * NCIT:C4813 (Recurrent Malignant Neoplasm)
   */
  tumorProgression:
    | OntologyClass
    | undefined;
  /**
   * Potentially a child term of NCIT:C28076 (Disease Grade Qualifier) or equivalent
   * See https://www.cancer.gov/about-cancer/diagnosis-staging/prognosis/tumor-grade-fact-sheet
   */
  tumorGrade:
    | OntologyClass
    | undefined;
  /**
   * ARGO mapping specimen::pathological_tumour_staging_system
   * ARGO mapping specimen::pathological_stage_group
   */
  pathologicalStage:
    | OntologyClass
    | undefined;
  /**
   * ARGO mapping specimen::pathological_t_category
   * ARGO mapping specimen::pathological_n_category
   * ARGO mapping specimen::pathological_m_category
   */
  pathologicalTnmFinding: OntologyClass[];
  /**
   * Clinically relevant bio markers. Most of the assays such as IHC are covered by the NCIT under the sub-hierarchy
   * NCIT:C25294 (Laboratory Procedure).
   * e.g. NCIT:C68748 (HER2/Neu Positive), NCIT:C131711 (Human Papillomavirus-18 Positive)
   */
  diagnosticMarkers: OntologyClass[];
  /**
   * Clinical procedure performed on the subject in order to extract the biosample.
   * ARGO mapping specimen::specimen_anatomic_location - Procedure::body_site
   * ARGO mapping specimen::specimen_acquisition_interval - Procedure::time_performed
   */
  procedure:
    | Procedure
    | undefined;
  /**
   * Pointer to the relevant file(s) for the biosample. Files relating to the entire individual e.g. a germline exome/genome
   * should be associated with the Phenopacket rather than the Biosample it was derived from.
   */
  files: File[];
  /**
   * This element can be used to specify the status of the sample. For instance, a status may be used as a normal
   * control, often in combination with another sample that is thought to contain a pathological finding.
   * We recommend use of ontology terms such as:
   * EFO:0009654 (reference sample) or EFO:0009655 (abnormal sample)
   * ARGO mapping sample_registration::tumour_normal_designation
   */
  materialSample:
    | OntologyClass
    | undefined;
  /**
   * Field to represent how the sample was processed.
   * ARGO mapping specimen::specimen_processing
   */
  sampleProcessing:
    | OntologyClass
    | undefined;
  /**
   * Field to represent how the sample was stored
   * ARGO mapping specimen::specimen_storage
   */
  sampleStorage: OntologyClass | undefined;
}
