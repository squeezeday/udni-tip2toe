import { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import { IQuestion } from '../../../types';

interface IProps {
  question: IQuestion;
  answer?: string | string[];
}
export default function Question({ question, answer }: IProps) {
  const getAnswer = (answer: string | string[]): ReactNode => {
    if (question.type === 'longText')
      return <ReactMarkdown children={answer as string} />;
    if (question.type === 'selectMultiple')
      return (answer as string[]).join(', ');
    return answer;
  };

  return (
    <div
      key={question.name}
      className="flex flex-col print:flex-row md:flex-row"
    >
      {question.title.length ? (
        <div className="w-full">
          <h4 className="text-gray-500 m-0">{question.title}</h4>
        </div>
      ) : null}
      <div className="w-full">{answer ? getAnswer(answer) : null}</div>
    </div>
  );
}
