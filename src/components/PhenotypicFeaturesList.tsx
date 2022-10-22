import { PhenotypicFeature } from '../interfaces/phenopackets/schema/v2/core/phenotypic_feature';

interface IProps {
  phenotypicFeatures?: PhenotypicFeature[];
}

export default function PhenotypicFeaturesList({ phenotypicFeatures }: IProps) {
  return (
    <>
      {phenotypicFeatures && phenotypicFeatures.length ? (
        phenotypicFeatures?.map((pf, i) => (
          <div key={`st-${i}`}>
            <p>
              <strong>{pf.type?.id}</strong> {pf.type?.label}
            </p>
          </div>
        ))
      ) : (
        <p>No features selected</p>
      )}
    </>
  );
}
