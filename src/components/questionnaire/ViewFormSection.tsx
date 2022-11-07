import tip2toeForm from '../../tip2toeform';
import { ICustomFormData, IFormSection } from '../../types';
import UploadedFiles from './uploads/UploadedFiles';

interface IProps {
  formSection?: IFormSection;
  slug?: string;
  customFormData?: ICustomFormData;
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
                <h4 className="text-gray-500">{question.title}</h4>
              </div>
            ) : null}
            <div className="w-full">
              <p>
                {props.customFormData && props.customFormData[question.name]}
              </p>
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
