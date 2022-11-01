import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { ICustomFormData } from '../../types';
import { IIndividualFormData } from '../questionnaire/EditIndividual';

const Select = React.forwardRef<
  HTMLSelectElement,
  {
    label: string;
    options: { label: string; value: string }[];
    multiple?: boolean;
  } & ReturnType<UseFormRegister<IIndividualFormData | ICustomFormData>>
>(({ onChange, onBlur, name, label, options, multiple }, ref) => (
  <>
    <label htmlFor={name}>{label}</label>
    <select
      name={name}
      id={name}
      ref={ref}
      multiple={multiple}
      onChange={onChange}
      onBlur={onBlur}
      className="block p-2 pr-10 rounded border border-gray-300 shadow-sm focus:border-udni-teal focus:ring-4 focus:outline-none focus:ring-udni-teal-100"
    >
      <option></option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </>
));
export default Select;
