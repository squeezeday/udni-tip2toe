import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { ICustomFormData } from '../../types';
import { IIndividualFormData } from '../questionnaire/EditIndividual';

const Input = React.forwardRef<
  HTMLInputElement,
  {
    label: string;
    type: string;
    className?: string;
    min?: string | number;
    max?: string | number;
  } & ReturnType<UseFormRegister<IIndividualFormData | ICustomFormData>>
>(({ onChange, onBlur, name, label, type, className, min, max }, ref) => (
  <>
    <label htmlFor={name}>{label}</label>
    <input
      name={name}
      type={type}
      id={name}
      ref={ref}
      min={min}
      max={max}
      onChange={onChange}
      onBlur={onBlur}
      className={`block p-2 rounded border border-gray-300 shadow-sm focus:border-udni-teal focus:ring-4 focus:outline-none focus:ring-udni-teal-100 ${className}`}
    />
  </>
));
export default Input;
