/* eslint-disable */
import type { OntologyClass } from "../../../phenopackets/schema/v2/core/base";
import type { Variation } from "../../vrs/v1/vrs";

export const protobufPackage = "org.ga4gh.vrsatile.v1";

export enum MoleculeContext {
  unspecified_molecule_context = 0,
  genomic = 1,
  transcript = 2,
  protein = 3,
  UNRECOGNIZED = -1,
}

/** https://vrsatile.readthedocs.io/en/latest/value_object_descriptor/vod_index.html#extension */
export interface Extension {
  name: string;
  value: string;
}

/** https://vrsatile.readthedocs.io/en/latest/value_object_descriptor/vod_index.html#expression */
export interface Expression {
  syntax: string;
  value: string;
  version: string;
}

export interface VcfRecord {
  genomeAssembly: string;
  chrom: string;
  pos: number;
  id: string;
  ref: string;
  alt: string;
  qual: string;
  filter: string;
  info: string;
}

export interface VariationDescriptor {
  id: string;
  variation: Variation | undefined;
  label: string;
  description: string;
  /** A specific gene context that applies to this variant. */
  geneContext:
    | GeneDescriptor
    | undefined;
  /** HGVS, SPDI, and gnomAD-style strings should be represented as Expressions */
  expressions: Expression[];
  /**
   * A VCF Record of the variant. This SHOULD be a single allele, the VCF genotype (GT) field should be represented in
   * the allelic_state
   */
  vcfRecord:
    | VcfRecord
    | undefined;
  /** Allele registry, ClinVar, or other related IDs should be included as xrefs */
  xrefs: string[];
  /** Common aliases for a variant, e.g. EGFR vIII, are alternate labels */
  alternateLabels: string[];
  extensions: Extension[];
  /**
   * The molecular context of the vrs variation. Must be one of “genomic”, “transcript”, or “protein”.
   * Defaults to "unspecified_molecule_context"
   */
  moleculeContext: MoleculeContext;
  /**
   * The structural variant type associated with this variant, such as a substitution, deletion, or fusion.
   * We RECOMMEND using a descendent term of SO:0001537.
   */
  structuralType:
    | OntologyClass
    | undefined;
  /** A Sequence corresponding to a “ref allele”, describing the sequence expected at a SequenceLocation reference. */
  vrsRefAlleleSeq: string;
  /**
   * We RECOMMEND that the allelic_state of variant be described by terms from the Genotype Ontology (GENO).
   * These SHOULD descend from concept GENO:0000875.
   */
  allelicState: OntologyClass | undefined;
}

/** https://vrsatile.readthedocs.io/en/latest/value_object_descriptor/vod_index.html#gene-descriptor */
export interface GeneDescriptor {
  /**
   * The official gene identifier as designated by the organism gene nomenclature committee e.g. HGNC:3477 or MGI:2385071
   * This should be a CURIE linking the reference to a namespace where it can be retrieved.
   * Mirrors the value_id field of a generic value object descriptor
   */
  valueId: string;
  /** The primary gene symbol. Takes the place of the label field in a generic descriptor */
  symbol: string;
  /** A free-text description of the value object */
  description: string;
  /** Alternate IDs (should be CURIE) for the same concept may be placed in alternate_ids */
  alternateIds: string[];
  /** Takes the place of alternate_labels field in a generic descriptor */
  alternateSymbols: string[];
  /** Related concept IDs (e.g. gene ortholog IDs) may be placed in xrefs */
  xrefs: string[];
}
