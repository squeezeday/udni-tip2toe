import { OntologyClass } from '../../interfaces/phenopackets/schema/v2/core/base';

interface IProps {
  ontology?: OntologyClass;
}
export default function Ontology({ ontology }: IProps) {
  return (
    <p>
      <strong>{ontology?.id}</strong> {ontology?.label}
    </p>
  );
}
