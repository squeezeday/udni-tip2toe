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
import { File as PhenopacketFile } from '../../../interfaces/phenopackets/schema/v2/core/base';
import axios from 'axios';

interface IProps {
  section: string;
}

type PreviewFile = File & {
  preview?: string;
  path?: string;
  error?: string;
  progress?: number;
};

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
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: file.type.startsWith('image')
              ? URL.createObjectURL(file)
              : undefined,
          }),
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

    try {
      const ret = await axios.post<UploadedFile>(uploadUrl, body, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / Number(progressEvent.total),
          );
          setFiles((v) => {
            return v.map((f) => {
              if (file.name === f.name) Object.assign(f, { progress });
              return f;
            });
          });
        },
      });

      const uploadedFile = ret.data;
      setFiles((values) => values.filter((v) => v.name !== file.name));

      const phenoPacketFile: PhenopacketFile = {
        uri: uploadedFile.url,
        fileAttributes: {
          section,
          mimeType: file.type,
          size: file.size.toString(),
          name: file.name,
        },
        individualToFileIdentifiers: {},
      };

      dispatch({ type: 'ADD_FILE', payload: phenoPacketFile });
    } catch (error) {
      console.error(error);
    }
  };

  const uploadFiles = async () => {
    setUploading(true);
    for (let i = 0; i < files.length; i++) {
      try {
        await uploadFile(files[i]);
      } catch (error) {
        console.error(error);
      } finally {
      }
    }
    setUploading(false);
  };

  const thumbs = files.map((file, i) => (
    <figure
      key={file.path}
      className="flex items-center justify-center bg-white rounded relative w-52 h-52"
    >
      {file.preview ? (
        <img
          className="max-w-full max-h-full"
          src={file.preview}
          // Revoke data uri after image is loaded
          onLoad={() => {
            file.preview && URL.revokeObjectURL(file.preview);
          }}
        />
      ) : (
        <p className="p-4 break-all">{file.path}</p>
      )}
      {file.progress ? (
        <div className="w-full bg-transparent absolute bottom-0 left-0">
          <div
            className="bg-udni-teal h-2.5"
            style={{ width: `${file.progress}%` }}
          ></div>
        </div>
      ) : null}
      <button
        className="absolute top-4 right-4 rounded-full bg-white"
        disabled={uploading}
        onClick={() => setFiles((v) => v.filter((_, vi) => vi !== i))}
      >
        <XCircleIcon className="w-6 h-6" />
      </button>
    </figure>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () =>
      files.forEach(
        (file) => file.preview && URL.revokeObjectURL(file.preview),
      );
  }, []);

  return (
    <div className="">
      <div
        {...getRootProps({
          className: `border-dashed border-2 p-4 mb-4 cursor-pointer ${
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
