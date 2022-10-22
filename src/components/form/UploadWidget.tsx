import { PhotoIcon } from '@heroicons/react/24/outline';
import { useStateMachine } from 'little-state-machine';
import Upload from 'rc-upload';
import { useState } from 'react';
import updateAction from '../../actions/updateAction';
import { UploadedFile } from '../../types';
import UploadedFiles from '../files/UploadedFiles';

type FileStatus = File & {
  error?: Error;
  success?: boolean;
  percent?: number;
  _id?: string;
};

interface IProps {
  section: string;
}

export default function UploadWidget({ section }: IProps) {
  const { actions, state } = useStateMachine({ updateAction });

  const [files, setFiles] = useState<FileStatus[]>([]);
  const uploadUrl = `${import.meta.env.VITE_APIURL}/api/v1/file`;

  return (
    <div className="container max-w-5xl py-8 ">
      <Upload
        multiple
        className="border-dashed border border-udni-teal rounded bg-white text-slate-300 h-48 flex flex-col justify-center items-center"
        name="file"
        action={uploadUrl}
        accept="image/*"
        onStart={(file) => setFiles((values) => [...values, file])}
        onError={(err, _, file) =>
          setFiles((values) => {
            const ret = [...values];
            const i = values.findIndex((v) => v.name === file.name);
            if (i > -1) {
              ret[i].error = err;
            }
            return ret;
          })
        }
        onProgress={(e, file) => {
          setFiles((values) => {
            const ret = [...values];
            const i = values.findIndex((v) => v.name === file.name);
            if (i > -1) {
              ret[i].percent = e.percent;
            }
            return ret;
          });
        }}
        onSuccess={(response, file) => {
          const uploadedFile = response as unknown as UploadedFile;
          setFiles((values) => values.filter((x) => x.name !== file.name));
          const files = state.files ? state.files : [];
          actions.updateAction({
            ...state,
            files: [...files, { ...uploadedFile, section }],
          });
        }}
      >
        <PhotoIcon className="w-8 h-8 m-2" />
        <p>Click or drop files here</p>
      </Upload>
      <div className="my-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {files.map((file) => (
          <div key={file.name} className="relative">
            <img
              src={URL.createObjectURL(file)}
              className={`object-contain m-auto max-h-52 ${
                file.percent === 100 ? '' : 'opacity-50'
              }`}
            />
            <div
              className={`flex absolute top-0 left-0 h-full ${
                file.error ? 'bg-red-500 w-full' : ''
              } ${
                file.percent && file.percent < 100
                  ? 'bg-udni-teal opacity-50'
                  : ''
              } `}
              style={{
                width: file.percent
                  ? `${Math.round(file.percent)}%`
                  : undefined,
              }}
            >
              <p className="m-auto inline-block">
                {file.error ? 'Error: ' + file.error?.message : null}{' '}
                {file.percent && file.percent < 100
                  ? `${Math.round(file.percent)}%`
                  : null}
              </p>
            </div>
          </div>
        ))}
      </div>

      <UploadedFiles section={section} />
    </div>
  );
}
