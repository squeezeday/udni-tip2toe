import { PhotoIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/solid';
import { useStateMachine } from 'little-state-machine';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import updateAction from '../../actions/updateAction';
import { UploadedFile } from '../../types';
import UploadedFiles from '../files/UploadedFiles';

interface IProps {
  section: string;
}

type PreviewFile = File & { preview: string; path: string };

export default function UploadWidget({ section }: IProps) {
  const { actions, state } = useStateMachine({ updateAction });
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [isActive, setIsActive] = useState(false);
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
      'application/pdf': [],
      'application/vnd.ms-excel': [],
    },
    onDrop: (acceptedFiles: File[]) => {
      setIsActive(false);
      setFiles((v) => [
        ...v,
        ...acceptedFiles.map(
          (f) =>
            ({
              ...f,
              preview: f.type.startsWith('image')
                ? URL.createObjectURL(f)
                : undefined,
            } as PreviewFile),
        ),
      ]);
    },
    onDragEnter: () => setIsActive(true),
    onDragLeave: () => setIsActive(false),
  });
  const uploadUrl = `${import.meta.env.VITE_APIURL}/api/v1/file`;

  const thumbs = files.map((file, i) => (
    <div
      key={file.path}
      className="flex items-center justify-center bg-white rounded relative"
    >
      <div>
        {file.preview ? (
          <img
            src={file.preview}
            // Revoke data uri after image is loaded
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
          />
        ) : (
          <p className="p-4 break-all">{file.path}</p>
        )}
      </div>
      <button
        className="absolute top-4 right-4 rounded-full bg-white"
        onClick={() =>
          setFiles((files) => files.filter((file, vi) => vi !== i))
        }
      >
        <XCircleIcon className="w-6 h-6" />
      </button>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <div className="">
      {/* <Upload
        multiple
        className=" bg-white text-slate-300 h-48 flex flex-col justify-center items-center"
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
      </Upload> */}
      <div
        {...getRootProps({
          className: `border-dashed border-2 p-4 mb-4 ${
            isActive
              ? 'border-udni-teal text-udni-teal'
              : 'border-gray-300 text-slate-300'
          } rounded bg-white  flex flex-col justify-center items-center select-none`,
        })}
      >
        <input {...getInputProps()} />
        <PhotoIcon className="w-8 h-8 m-2" />
        <p>Click or drop files here</p>
      </div>
      <aside className="grid grid-cols-2 md:grid-cols-6 gap-4">{thumbs}</aside>

      {files.length ? (
        <button
          type="submit"
          className="border rounded p-2 px-5 my-2 border-udni-teal text-udni-teal uppercase text-sm font-bold hover:bg-udni-teal hover:text-white"
        >
          Upload and Save
        </button>
      ) : null}

      {/* <UploadedFiles section={section} /> */}
    </div>
  );
}
