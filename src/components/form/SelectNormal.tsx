import { YesNoUnknown } from '../../types';

interface IProps {
  value?: YesNoUnknown;
  onChange: (value: YesNoUnknown) => void;
}
const options = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
  { label: 'Not investigated', value: 'unknown' },
];
export default function SelectNormal({ value, onChange }: IProps) {
  return (
    <div className="inline-flex flex-row items-center rounded overflow-hidden border divide-x divide-gray-100">
      {options.map((option) => {
        const checked = value === option.value;
        return (
          <label
            className={`block relative select-none p-2 px-3 text-sm cursor-pointer  ${
              checked
                ? 'bg-udni-teal text-white'
                : 'text-slate-500 hover:text-slate-900 hover:bg-white'
            }`}
            key={`opt-${option.value}`}
          >
            {' '}
            <input
              type="radio"
              value={option.value}
              className="accent-udni-teal ring-udni-teal sr-only"
              checked={checked}
              onChange={(e) => {
                onChange(e.target.value as YesNoUnknown);
              }}
            />{' '}
            {option.label}
          </label>
        );
      })}
    </div>
  );
}
