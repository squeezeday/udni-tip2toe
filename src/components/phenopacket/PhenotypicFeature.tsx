import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline';
import { PhenotypicFeature as IPhenotypicFeature } from '../../interfaces/phenopackets/schema/v2/core/phenotypic_feature';
import Ontology from './Ontology';

interface IProps {
  phenotypicFeature: IPhenotypicFeature;
}
export default function PhenotypicFeature({ phenotypicFeature }: IProps) {
  const { excluded } = phenotypicFeature;
  return (
    <div className={excluded ? ' text-gray-400' : ''}>
      <p>
        {excluded ? (
          <XMarkIcon className="w-5 h-5 inline-block mr-1 text-red-500" />
        ) : (
          <CheckIcon className="w-5 h-5 inline-block mr-1 text-green-500" />
        )}
        <Ontology ontology={phenotypicFeature?.type} />
      </p>
      {phenotypicFeature?.description ? (
        <p>{phenotypicFeature?.description}</p>
      ) : null}
    </div>
  );
}
