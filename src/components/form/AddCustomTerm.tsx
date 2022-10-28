import { Combobox } from '@headlessui/react';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Fragment, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IJaxTerm, searchHpoTerms } from '../../utils/lookupHpoTerm';

export interface AddCustomTermFormModel {
  term: string;
}

interface IProps {
  onSubmit: (formData: AddCustomTermFormModel) => void;
}
export default function AddCustomTerm({ onSubmit }: IProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AddCustomTermFormModel>();

  const doSubmit = async (formData: AddCustomTermFormModel) => {
    onSubmit({ term });
    reset();
    setTerm('');
  };

  const [term, setTerm] = useState('');
  const [query, setQuery] = useState('');
  const [terms, setTerms] = useState<IJaxTerm[]>([]);

  async function doSearch() {
    if (query) {
      const { terms, error } = await searchHpoTerms(query);
      if (terms) setTerms(terms);
      else setTerms([]);
    } else {
      setTerms([]);
    }
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      doSearch();
    }, 500);
    return () => {
      clearTimeout(timeout);
    };
  }, [query]);

  return (
    <form onSubmit={handleSubmit(doSubmit)}>
      <fieldset className="inline-flex border border-gray-300 rounded focus:border-udni-teal bg-white relative">
        <Combobox value={term} onChange={setTerm}>
          <Combobox.Input
            onChange={(event) => setQuery(event.target.value)}
            className="bg-transparent p-2 border-0 focus:border-none focus:outline-none focus:ring-0"
          />
          <Combobox.Options className="absolute top-8 bg-white h-48 overflow-auto rounded p-2 w-full">
            {terms.map((term) => (
              <Combobox.Option key={term.id} value={term.id} as={Fragment}>
                {({ active, selected }) => (
                  <li
                    className={`p-2 rounded ${
                      active ? 'bg-udni-teal-200' : ''
                    }`}
                  >
                    <p>{term.name}</p>
                    <span className="text-sm">{term.id}</span>
                  </li>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox>
        <button
          className="flex items-center  p-2 px-4  border-udni-teal text-udni-teal uppercase text-sm font-bold hover:bg-udni-teal hover:text-white"
          type="submit"
        >
          <PlusIcon className="w-4 h-4" /> Add
        </button>
      </fieldset>
      <p className="text-red-500 basis-full">{errors?.term?.message}</p>
      <p className="text-sm text-gray-500">
        Read more at{' '}
        <a href="https://hpo.jax.org/app/" target="_blank">
          hpo.jax.org
        </a>
      </p>
    </form>
  );
}
