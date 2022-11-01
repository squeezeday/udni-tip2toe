import { Path, UseFormRegister } from 'react-hook-form';
import { ICustomFormData } from '../../types';

type InputProps = {
  label: string;
  register: UseFormRegister<ICustomFormData>;
  required?: boolean;
  name: Path<ICustomFormData>;
};

const TextArea = ({ label, register, name, required }: InputProps) => (
  <div className="my-4">
    <label htmlFor={name}>{label}</label>
    <textarea
      id={name}
      {...register(name, { required })}
      className="block p-2 h-48 w-full rounded border border-gray-300 shadow-sm focus:border-udni-teal focus:ring-4 focus:outline-none focus:ring-udni-teal-100"
    ></textarea>
  </div>
);

export default TextArea;
