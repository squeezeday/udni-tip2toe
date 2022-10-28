import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import UploadWidget from './form/UploadWidget';

export default function UploadPage() {
  const { id } = useParams();
  const uploadSections = [
    'Photographs',
    'Pedigree',
    'Growth Chart',
    'X-Ray/MRI/CT',
    'Laboratory',
  ];
  return (
    <div className="container max-w-5xl p-4">
      <h1>Add more information to Phenopacket {id}</h1>
      <p className="text-gray-500">
        Please provide relevant images and documents
      </p>

      {uploadSections.map((x) => (
        <div key={x}>
          <h2>{x}</h2>
          <UploadWidget section={x} />
        </div>
      ))}
    </div>
  );
}
