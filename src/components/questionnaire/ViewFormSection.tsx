import ReactMarkdown from 'react-markdown';
import { Phenopacket } from '../../interfaces/phenopackets/schema/v2/phenopackets';
import tip2toeForm from '../../tip2toeform';
import { ICustomFormData, IFormSection } from '../../types';
import UploadedFiles from './uploads/UploadedFiles';

interface IProps {
  formSection?: IFormSection;
  slug?: string;
  customFormData?: ICustomFormData;
  phenoPacket?: Partial<Phenopacket>;
}

export default function ViewFormSection(props: IProps) {
  const formSection =
    props.formSection ||
    tip2toeForm.formSections?.find((x) => x.slug === props.slug);

  if (!formSection) return null;
  const questions = formSection.questions?.filter(
    (question) =>
      props.customFormData &&
      props.customFormData[question.name] &&
      props.customFormData[question.name].length,
  );
  const files = props.phenoPacket?.files?.filter((x) =>
    x.fileAttributes['section'].startsWith(formSection.slug),
  );
  if (!questions?.length && !files?.length) return null;

  return (
    <>
      <section key={formSection.slug}>
        <h3>{formSection.title}</h3>
        {questions?.map((question) => (
          <div
            key={question.name}
            className="flex flex-col print:flex-row md:flex-row"
          >
            {question.title.length ? (
              <div className="w-full">
                <h4 className="text-gray-500 m-0">{question.title}</h4>
              </div>
            ) : null}
            <div className="w-full">
              {props.customFormData ? (
                <>
                  {question.type === 'longText' ? (
                    <ReactMarkdown
                      children={props.customFormData[question.name]}
                    />
                  ) : (
                    props.customFormData[question.name]
                  )}
                </>
              ) : null}
            </div>
          </div>
        ))}
        {formSection.uploadSections?.map((uploadSection) => (
          <UploadedFiles
            key={`${formSection.slug}:${uploadSection}`}
            section={`${formSection.slug}:${uploadSection}`}
          />
        ))}
      </section>
    </>
  );
}
