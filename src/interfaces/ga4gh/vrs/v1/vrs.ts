/* eslint-disable */

export const protobufPackage = "org.ga4gh.vrs.v1";

export interface Variation {
  allele: Allele | undefined;
  haplotype: Haplotype | undefined;
  copyNumber: CopyNumber | undefined;
  text: Text | undefined;
  variationSet: VariationSet | undefined;
}

export interface MolecularVariation {
  allele: Allele | undefined;
  haplotype: Haplotype | undefined;
}

export interface UtilityVariation {
  text: Text | undefined;
  variationSet: VariationSet | undefined;
}

export interface SystemicVariation {
  copyNumber: CopyNumber | undefined;
}

export interface Allele {
  Id: string;
  curie: string | undefined;
  chromosomeLocation: ChromosomeLocation | undefined;
  sequenceLocation:
    | SequenceLocation
    | undefined;
  /** @deprecated */
  sequenceState: SequenceState | undefined;
  literalSequenceExpression: LiteralSequenceExpression | undefined;
  derivedSequenceExpression: DerivedSequenceExpression | undefined;
  repeatedSequenceExpression: RepeatedSequenceExpression | undefined;
}

export interface Haplotype {
  Id: string;
  members: Haplotype_Member[];
}

export interface Haplotype_Member {
  allele: Allele | undefined;
  curie: string | undefined;
}

export interface Text {
  Id: string;
  definition: string;
}

export interface VariationSet {
  Id: string;
  members: VariationSet_Member[];
}

export interface VariationSet_Member {
  curie: string | undefined;
  allele: Allele | undefined;
  haplotype: Haplotype | undefined;
  copyNumber: CopyNumber | undefined;
  text: Text | undefined;
  variationSet: VariationSet | undefined;
}

export interface Abundance {
  copyNumber: CopyNumber | undefined;
}

export interface CopyNumber {
  Id: string;
  allele: Allele | undefined;
  haplotype: Haplotype | undefined;
  gene: Gene | undefined;
  literalSequenceExpression: LiteralSequenceExpression | undefined;
  derivedSequenceExpression: DerivedSequenceExpression | undefined;
  repeatedSequenceExpression: RepeatedSequenceExpression | undefined;
  curie: string | undefined;
  number: Number | undefined;
  indefiniteRange: IndefiniteRange | undefined;
  definiteRange: DefiniteRange | undefined;
}

export interface Location {
  chromosomeLocation: ChromosomeLocation | undefined;
  sequenceLocation: SequenceLocation | undefined;
}

export interface ChromosomeLocation {
  Id: string;
  speciesId: string;
  chr: string;
  interval: CytobandInterval | undefined;
}

export interface SequenceLocation {
  Id: string;
  sequenceId: string;
  sequenceInterval:
    | SequenceInterval
    | undefined;
  /** @deprecated */
  simpleInterval: SimpleInterval | undefined;
}

export interface SequenceInterval {
  startNumber: Number | undefined;
  startIndefiniteRange: IndefiniteRange | undefined;
  startDefiniteRange: DefiniteRange | undefined;
  endNumber: Number | undefined;
  endIndefiniteRange: IndefiniteRange | undefined;
  endDefiniteRange: DefiniteRange | undefined;
}

export interface CytobandInterval {
  start: string;
  end: string;
}

export interface SequenceExpression {
  literalSequenceExpression: LiteralSequenceExpression | undefined;
  derivedSequenceExpression: DerivedSequenceExpression | undefined;
  repeatedSequenceExpression: RepeatedSequenceExpression | undefined;
}

export interface LiteralSequenceExpression {
  sequence: string;
}

export interface DerivedSequenceExpression {
  location: SequenceLocation | undefined;
  reverseComplement: boolean;
}

export interface RepeatedSequenceExpression {
  literalSequenceExpression: LiteralSequenceExpression | undefined;
  derivedSequenceExpression: DerivedSequenceExpression | undefined;
  number: Number | undefined;
  indefiniteRange: IndefiniteRange | undefined;
  definiteRange: DefiniteRange | undefined;
}

export interface Feature {
  gene: Gene | undefined;
}

export interface Gene {
  geneId: string;
}

export interface Number {
  value: number;
}

export interface IndefiniteRange {
  value: number;
  comparator: string;
}

export interface DefiniteRange {
  min: number;
  max: number;
}

export interface SequenceState {
  sequence: string;
}

export interface SimpleInterval {
  start: number;
  end: number;
}
