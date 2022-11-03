import { PhenotypicFeature as IPhenotypicFeature } from '../../interfaces/phenopackets/schema/v2/core/phenotypic_feature';
import Ontology from './Ontology';

interface IProps {
  phenotypicFeature?: IPhenotypicFeature;
}
export default function PhenotypicFeature({ phenotypicFeature }: IProps) {
  return (
    <>
      <Ontology ontology={phenotypicFeature?.type} />
      {phenotypicFeature?.description ? (
        <p>{phenotypicFeature?.description}</p>
      ) : null}
      <p>
        Excluded:{' '}
        {phenotypicFeature?.excluded
          ? phenotypicFeature?.excluded
            ? 'Yes'
            : 'No'
          : 'Unknown'}
      </p>
    </>
  );
}
