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
  const { title, description, questions, uploadSections, ontologies, slug } =
    formSection;
  return (
    <>
      <h2>{title}</h2>
      {description ? (
        <ReactMarkdown children={description}></ReactMarkdown>
      ) : null}
      {uploadSections ? (
        <div>
          {uploadSections.map((x) => (
            <div key={x}>
              <h4>{x}</h4>
              <UploadWidget section={`${slug}:${x}`} />
            </div>
          ))}
          <NavButtons />
        </div>
      ) : null}
      <Questions questions={questions} />
      <EditPhenotypicFeatures ontologies={ontologies} slug={slug} />
    </>
  );
}
