import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { PhenotypicFeature } from '../../interfaces/phenopackets/schema/v2/core/phenotypic_feature';

interface IProps {
  phenotypicFeatures?: PhenotypicFeature[];
}

export default function PhenotypicFeaturesList({ phenotypicFeatures }: IProps) {
  return (
    <>
      {phenotypicFeatures && phenotypicFeatures.length
        ? phenotypicFeatures
            ?.filter((x) => x.type?.id !== 'other')
            .map((pf, i) => (
              <div key={`st-${i}`}>
                <p className={pf.excluded ? ' text-gray-400' : ''}>
                  {pf.excluded ? (
                    <XMarkIcon className="w-5 h-5 inline-block mr-1 text-red-500" />
                  ) : (
                    <CheckIcon className="w-5 h-5 inline-block mr-1 text-green-500" />
                  )}
                  <strong>{pf.type?.id}</strong> {pf.type?.label}
                </p>
              </div>
            ))
        : null}
    </>
  );
}
