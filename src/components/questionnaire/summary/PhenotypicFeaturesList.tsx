import { PhenotypicFeature as IPhenotypicFeature } from '../../../interfaces/phenopackets/schema/v2/core/phenotypic_feature';
import PhenotypicFeature from '../../phenopacket/PhenotypicFeature';

interface IProps {
  phenotypicFeatures?: IPhenotypicFeature[];
}

export default function PhenotypicFeaturesList({ phenotypicFeatures }: IProps) {
  return (
    <>
      {phenotypicFeatures && phenotypicFeatures.length
        ? phenotypicFeatures
            ?.filter((x) => x.type?.id !== 'other')
            .map((phenotypicFeature) => (
              <PhenotypicFeature
                phenotypicFeature={phenotypicFeature}
                key={phenotypicFeature.type?.id}
              />
            ))
        : null}
    </>
  );
}
