export interface TermResponse {
  details: Details;
  relations: Relations;
}

export interface Relations {
  termCount: number;
  parents: Parent[];
  children: Parent[];
}

export interface Parent {
  name: string;
  id: number;
  childrenCount: number;
  ontologyId: string;
}

export interface Details {
  name: string;
  id: string;
  altTermIds: string[];
  definition: string;
  comment: string;
  synonyms: string[];
  isObsolete: boolean;
  xrefs: string[];
  pubmedXrefs: string[];
}
