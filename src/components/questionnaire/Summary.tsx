import PhenotypicFeaturesList from './summary/PhenotypicFeaturesList';
import tip2toeForm from '../../tip2toeform';
import ViewFormSection from './summary/ViewFormSection';
import ViewIndividual from './ViewIndividual';
import ViewPhotographs from './uploads/ViewPhotographs';
import { Phenopacket } from '../../interfaces/phenopackets/schema/v2/phenopackets';
import { ICustomFormData } from '../../types';

interface IProps {
  phenoPacket: Partial<Phenopacket>;
  customFormData?: ICustomFormData;
}
export default function Summary({ phenoPacket, customFormData }: IProps) {
  return (
    <article className="summary divide-y space-y-4">
      <ViewPhotographs
        files={phenoPacket?.files?.filter((x) =>
          x.fileAttributes['section'].startsWith('photographs'),
        )}
        // onRemove={(file) => dispatch({ type: 'REMOVE_FILE', payload: file })}
      />
      <ViewFormSection
        slug="this-is-me"
        customFormData={customFormData || {}}
        phenoPacket={phenoPacket}
      />
      {phenoPacket.subject ? (
        <ViewIndividual
          individual={phenoPacket.subject}
          customFormData={customFormData}
        />
      ) : null}
      <ViewFormSection
        slug="clinical-findings"
        customFormData={customFormData || {}}
        phenoPacket={phenoPacket}
      />
      <section className="my-4">
        <h3>Phenotypic features</h3>
        <PhenotypicFeaturesList
          phenotypicFeatures={phenoPacket.phenotypicFeatures?.filter(
            (x) => !x.excluded,
          )}
        />
        <PhenotypicFeaturesList
          phenotypicFeatures={phenoPacket.phenotypicFeatures?.filter(
            (x) => x.excluded,
          )}
        />
      </section>

      {tip2toeForm.formSections
        ?.filter(
          (x) =>
            (x.questions?.length || x.uploadSections?.length) &&
            x.slug !== 'photographs' &&
            x.slug !== 'clinical-findings' &&
            x.slug !== 'this-is-me',
        )
        .map((formSection) => {
          return (
            <ViewFormSection
              formSection={formSection}
              key={formSection.slug}
              customFormData={customFormData || {}}
              phenoPacket={phenoPacket}
            />
          );
        })}
    </article>
  );
}
