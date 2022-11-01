import { useStateMachine } from 'little-state-machine';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import updateAction from '../../../actions/updateAction';
import { ICustomFormData, IFormSection } from '../../../types';
import Input from '../../individual/Input';
import Select from '../../individual/Select';
import TextArea from '../../individual/TextArea';
import { useNextUrl } from '../layouts/Layout';
import NextButton from './NextButton';

interface IProps {
  formSection: IFormSection;
}
export default function Questions({ formSection }: IProps) {
  const { actions, state } = useStateMachine({ updateAction });
  const { nextUrl } = useNextUrl();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<ICustomFormData>({
    defaultValues: state.customFormData,
  });

  const doSubmit = async (formData: ICustomFormData) => {
    await actions.updateAction({
      ...state,
      customFormData: { ...state.customFormData, ...formData },
    });
    nextUrl !== null && navigate(nextUrl);
  };
  return (
    <form onSubmit={handleSubmit(doSubmit)} className="my-5">
      {formSection?.questions?.map(({ title, name, options, type }) => {
        switch (type) {
          case 'selectMultiple':
          case 'select':
            return (
              <div className="my-4" key={name}>
                <Select
                  {...register(name)}
                  label={title}
                  multiple={type === 'selectMultiple'}
                  options={options?.map((o) => ({ value: o, label: o })) || []}
                />
              </div>
            );
            break;
          case 'text':
            return (
              <div className="my-4" key={name}>
                <Input type="text" {...register(name)} label={title} />
              </div>
            );
            break;
          case 'number':
            return (
              <div className="my-4" key={name}>
                <Input type="number" {...register(name)} label={title} />
              </div>
            );
            break;
          case 'date':
            return (
              <div className="my-4" key={name}>
                <Input type="date" {...register(name)} label={title} />
              </div>
            );
            break;
        }
        return (
          <TextArea label={title} name={name} key={name} register={register} />
          // <div className="my-4" key={name}>
          //   <label htmlFor={name}>{title}</label>
          //   <textarea
          //     id={name}
          //     {...register(name)}
          //     className="block p-2 w-full rounded border border-gray-300 shadow-sm focus:border-udni-teal focus:ring-4 focus:outline-none focus:ring-udni-teal-100"
          //   ></textarea>
          // </div>
        );
      })}
      <NextButton />
    </form>
  );
}
