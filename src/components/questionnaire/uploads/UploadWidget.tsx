import {
  PhotoIcon,
  XCircleIcon,
  CloudArrowUpIcon,
} from '@heroicons/react/24/outline';
import { useContext, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadedFile } from '../../../types';
import UploadedFiles from './UploadedFiles';
import Spinner from '../../common/Spinner';
import { AppContext } from '../../../context/AppContext';

interface IProps {
  section: string;
}

type PreviewFile = File & { preview: string; path: string };

export default function UploadWidget({ section }: IProps) {
  const { dispatch } = useContext(AppContext);
  const [files, setFiles] = useState<PreviewFile[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { getRootProps, getInputProps } = useDropzone({
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

  const uploadFile = async (file: File) => {
    const body = new FormData();
    body.append('file', file);
    const ret = await fetch(uploadUrl, { method: 'POST', body });
    const uploadedFile = (await ret.json()) as unknown as UploadedFile;
    setFiles((values) => values.filter((x) => x.name !== file.name));

    dispatch({ type: 'ADD_FILE', payload: uploadedFile });
  };

  const uploadFiles = async () => {
    setUploading(true);
    for (let i = 0; i < files.length; i++) {
      try {
        await uploadFile(files[i]);
      } catch (error) {
      } finally {
      }
    }
    setUploading(false);
  };

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
        disabled={uploading}
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
        <PhotoIcon className="w-8 h-8" />
        <p>Click or drop files here</p>
      </div>
      <aside className="grid grid-cols-2 md:grid-cols-4 gap-4">{thumbs}</aside>

      {files.length ? (
        <button
          disabled={uploading}
          type="submit"
          className="border rounded p-2 px-4 my-2 border-udni-teal text-udni-teal uppercase text-sm font-bold hover:bg-udni-teal hover:text-white"
          onClick={uploadFiles}
        >
          <CloudArrowUpIcon className="w-4 h-4 inline-block mr-2" />
          Upload and Save
          {uploading ? <Spinner /> : null}
        </button>
      ) : null}

      <UploadedFiles section={section} />
    </div>
  );
}
