import { IQuestion, YesNoUnknown } from '../../types';
import SelectNormal from './SelectNormal';

interface IProps {
  question: IQuestion;
  value?: YesNoUnknown;
  onChange: (value: YesNoUnknown) => void;
}
export default function Feature({ question, value, onChange }: IProps) {
  const { term, label } = question;
  return (
    <div>
      <div>
        <h3 className="m-0">{label}</h3>
        <p className="text-sm text-gray-500">{term}</p>
      </div>
      <div className="mt-4">
        <SelectNormal
          value={value}
          onChange={(v) => {
            onChange(v);
          }}
        />
      </div>
    </div>
  );
}
