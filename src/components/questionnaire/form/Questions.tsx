import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context/AppContext';
import { ICustomFormData, IQuestion } from '../../../types';
import Input from '../../individual/Input';
import Select from '../../individual/Select';
import TextArea from '../../individual/TextArea';
import { useNextUrl } from '../layouts/Layout';
import NextButton from './NextButton';

interface IProps {
  questions?: IQuestion[];
}
export default function Questions({ questions }: IProps) {
  const { state, dispatch } = useContext(AppContext);
  const { nextUrl } = useNextUrl();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<ICustomFormData>({
    defaultValues: state.customFormData,
  });

  const doSubmit = async (formData: ICustomFormData) => {
    dispatch({ type: 'CUSTOM_FORM_DATA', payload: formData });
    nextUrl !== null && navigate(nextUrl);
  };
  return (
    <form onSubmit={handleSubmit(doSubmit)} className="my-5">
      {questions?.map(({ title, name, options, type }) => {
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
          case 'text':
            return (
              <div className="my-4" key={name}>
                <Input type="text" {...register(name)} label={title} />
              </div>
            );
          case 'number':
            return (
              <div className="my-4" key={name}>
                <Input type="number" {...register(name)} label={title} />
              </div>
            );
          case 'date':
            return (
              <div className="my-4" key={name}>
                <Input type="date" {...register(name)} label={title} />
              </div>
            );
        }
        return (
          <TextArea label={title} name={name} key={name} register={register} />
        );
      })}
      <NextButton />
    </form>
  );
}
