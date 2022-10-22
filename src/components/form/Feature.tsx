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
    <div className="py-2 border-b " key={`chk-${term}`}>
      <p className="relative pb-2">
        <span className="float-right">{term}</span>
        {label}
      </p>
      <SelectNormal
        value={value}
        onChange={(v) => {
          onChange(v);
        }}
      />
    </div>
  );
}
