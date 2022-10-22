/* eslint-disable */
import type { ExternalReference } from "./base";

export const protobufPackage = "org.phenopackets.schema.v2.core";

export interface MetaData {
  /** ISO8601 UTC timestamp for when this phenopacket was created in ISO "2018-03-01T00:00:00Z" */
  created:
    | Date
    | undefined;
  /**
   * some kind of identifier for the contributor/ program
   * ARGO sample_registration::program_id
   */
  createdBy: string;
  /** information about the person/organisation/network that has submitted this phenopacket */
  submittedBy: string;
  /** a listing of the ontologies and resources referenced in the phenopacket */
  resources: Resource[];
  /** An OPTIONAL list of Updates to the phenopacket. */
  updates: Update[];
  /** phenopacket-schema-version used to create this phenopacket */
  phenopacketSchemaVersion: string;
  /**
   * External identifiers for this message. These are considered different representation of the same record, not
   * records which are in some other relation with the record at hand. For example this might be a PubMed reference
   * to a study in which the individuals are reported.
   */
  externalReferences: ExternalReference[];
}

/**
 * Description of an external resource used for referencing an object. For example the resource may be an ontology such
 * as the HPO or SNOMED.
 * FHIR mapping: CodeSystem (http://www.hl7.org/fhir/codesystem.html)
 */
export interface Resource {
  /**
   * for OBO Ontologies, the value of this string MUST always be the official
   * OBO ID, which is always equivalent to the ID prefix in lower case.
   * Examples: hp, go, mp, mondo
   * Consult http://obofoundry.org for a complete list
   * For other ontologies (e.g. SNOMED), use the prefix in identifiers.org
   */
  id: string;
  /**
   * e.g. The Human Phenotype Ontology
   * for OBO Ontologies, the value of this string SHOULD be the same as the title
   * field on http://obofoundry.org
   * however, this field is purely for information purposes and software
   * should not encode any assumptions
   */
  name: string;
  /**
   * For OBO ontologies, this should always be the PURL, e.g.
   * http://purl.obolibrary.org/obo/hp.owl, http://purl.obolibrary.org/obo/hp.obo
   */
  url: string;
  /** for OBO ontologies, this should be the versionIRI */
  version: string;
  /**
   * The prefix used in the CURIE of an OntologyClass e.g. HP, MP, ECO
   * For example an HPO term will have a CURIE like this - HP:0012828 which should be used in combination with
   * the iri_prefix to form a fully-resolvable IRI
   */
  namespacePrefix: string;
  /**
   * Full IRI prefix which can be used with the namespace_prefix and the OntologyClass::id to resolve to an IRI for a
   * term. Tools such as the curie-util (https://github.com/prefixcommons/curie-util) can utilise this to produce
   * fully-resolvable IRIs for an OntologyClass.
   * e.g. Using the HPO term encoding the concept of 'Severe'
   *    OntologyClass:
   *        id: 'HP:0012828'
   *        label: 'Severe'
   *    Resource:
   *        namespace_prefix: 'HP'
   *        iri_prefix: 'http://purl.obolibrary.org/obo/HP_'
   * the term can be resolved to http://purl.obolibrary.org/obo/HP_0012828
   */
  iriPrefix: string;
}

/**
 * Information about when an update to a record occurred, who or what made the update and any pertinent information
 * regarding the content and/or reason for the update
 */
export interface Update {
  /**
   * ISO8601 UTC timestamps at which this record was updated, in
   * the format YYYY-MM-DDTHH:MM:SS.SSSZ e.g. 2007-12-03T10:15:30.00Z
   * REQUIRED
   */
  timestamp:
    | Date
    | undefined;
  /**
   * Information about the person/organisation/network that has updated the phenopacket.
   * OPTIONAL
   */
  updatedBy: string;
  /**
   * Textual comment about the changes made to the content and/or reason for the update.
   * OPTIONAL
   */
  comment: string;
}
