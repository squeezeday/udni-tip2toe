/* eslint-disable */

export const protobufPackage = "org.phenopackets.schema.v2.core";

/**
 * A class (aka term, concept) in an ontology.
 * FHIR mapping: CodeableConcept (http://www.hl7.org/fhir/datatypes.html#CodeableConcept)
 *   see also Coding (http://www.hl7.org/fhir/datatypes.html#Coding)
 */
export interface OntologyClass {
  /**
   * a CURIE-style identifier e.g. HP:0100024, MP:0001284, UBERON:0001690.
   * This is the primary key for the ontology class
   * REQUIRED!
   */
  id: string;
  /** class label, aka name. E.g. "Abnormality of cardiovascular system" */
  label: string;
}

/** FHIR mapping: Reference (https://www.hl7.org/fhir/references.html) */
export interface ExternalReference {
  /**
   * e.g. ISBN, PMID:123456, DOI:...,
   * FHIR mapping: Reference.identifier
   */
  id: string;
  /**
   * A full or partial URL pointing to the external reference if no commonly resolvable identifier can be used in the
   * `id` field
   * FHIR mapping Reference.reference
   */
  reference: string;
  /**
   * Human readable title or display string for the reference
   * FHIR mapping: Reference.display
   */
  description: string;
}

/** FHIR mapping: Condition.evidence (https://www.hl7.org/fhir/condition-definitions.html#Condition.evidence) */
export interface Evidence {
  /**
   * The encoded evidence type using, for example the Evidence & Conclusion Ontology (ECO - http://purl.obolibrary.org/obo/eco.owl)
   * FHIR mapping: Condition.evidence.code
   */
  evidenceCode:
    | OntologyClass
    | undefined;
  /** FHIR mapping: Condition.evidence.detail */
  reference: ExternalReference | undefined;
}

/**
 * A clinical procedure performed on a subject. By preference a single concept to indicate both the procedure and the
 * body site should be used. In cases where this is not possible, the body site should be indicated using a separate
 * ontology class.
 * e.g.
 * {"code":{"NCIT:C51585": "Biopsy of Soft Palate"}}
 * {"code":{"NCIT:C28743": "Punch Biopsy"}, "body_site":{"UBERON:0003403": "skin of forearm"}} - a punch biopsy of the skin from the forearm
 * FHIR mapping: Procedure (https://www.hl7.org/fhir/procedure.html)
 */
export interface Procedure {
  /** FHIR mapping: Procedure.code */
  code:
    | OntologyClass
    | undefined;
  /** FHIR mapping: Procedure.bodySite */
  bodySite:
    | OntologyClass
    | undefined;
  /** When the procedure was performed. */
  performed: TimeElement | undefined;
}

export interface GestationalAge {
  weeks: number;
  days: number;
}

/**
 * See http://build.fhir.org/datatypes and http://build.fhir.org/condition-definitions.html#Condition.onset_x_
 * In FHIR this is represented as a UCUM measurement - http://unitsofmeasure.org/trac/
 */
export interface Age {
  /**
   * The :ref:`ISO 8601<metadata_date_time>` age of this object as ISO8601
   * duration or time intervals. e.g. P40Y10M05D)
   */
  iso8601duration: string;
}

export interface AgeRange {
  start: Age | undefined;
  end: Age | undefined;
}

export interface TimeInterval {
  start: Date | undefined;
  end: Date | undefined;
}

export interface TimeElement {
  gestationalAge: GestationalAge | undefined;
  age: Age | undefined;
  ageRange: AgeRange | undefined;
  ontologyClass: OntologyClass | undefined;
  timestamp: Date | undefined;
  interval: TimeInterval | undefined;
}

export interface File {
  /** URI for the file e.g. file://data/genomes/file1.vcf.gz or https://opensnp.org/data/60.23andme-exome-vcf.231?1341012444 */
  uri: string;
  /**
   * A map of identifiers mapping an individual to a sample in the file. The key values must correspond to the
   * Individual::id for the individuals in the message, the values must map to the samples in the file.
   */
  individualToFileIdentifiers: { [key: string]: string };
  /**
   * Map of attributes describing the file. For example the File format or genome assembly would be defied here. For
   * genomic data files there MUST be a 'genomeAssembly' key.
   */
  fileAttributes: { [key: string]: string };
}

export interface File_IndividualToFileIdentifiersEntry {
  key: string;
  value: string;
}

export interface File_FileAttributesEntry {
  key: string;
  value: string;
}
