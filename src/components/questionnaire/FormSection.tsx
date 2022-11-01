import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { IFormSection } from '../../types';
import EditPhenotypicFeatures from './EditPhenotypicFeatures';
import NavButtons from './form/NavButtons';
import Questions from './form/Questions';
import UploadWidget from './uploads/UploadWidget';

interface IProps {
  formSection: IFormSection;
}

export default function FormSection({ formSection }: IProps) {
  return (
    <>
      <h2>{formSection?.title}</h2>
      {formSection.description ? (
        <ReactMarkdown children={formSection.description}></ReactMarkdown>
      ) : null}
      {formSection?.uploadSections ? (
        <div>
          {formSection.uploadSections.map((x) => (
            <div key={x}>
              <h4>{x}</h4>
              <UploadWidget section={`${formSection.slug}:${x}`} />
            </div>
          ))}
          <NavButtons />
        </div>
      ) : null}
      {formSection.questions ? <Questions formSection={formSection} /> : null}
      {formSection.ontologies ? (
        <EditPhenotypicFeatures formSection={formSection} />
      ) : null}
    </>
  );
}
