import { XCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import { File } from '../../../interfaces/phenopackets/schema/v2/core/base';
import FilePreview from './FilePreview';

interface IProps {
  section: string;
}
export default function UploadedFiles({ section }: IProps) {
  const { state, dispatch } = useContext(AppContext);
  const [files, setFiles] = useState<File[] | undefined>();

  useEffect(
    () =>
      setFiles(
        state.phenoPacket?.files?.filter(
          (x) => x.fileAttributes['section'] === section,
        ),
      ),
    [state?.phenoPacket?.files, section],
  );

  return (
    <section>
      <div>
        {files
          ?.filter(
            (file) =>
              file.fileAttributes['mimeType']
                ?.toLowerCase()
                .startsWith('image/') !== true,
          )
          ?.map((file) => (
            <FilePreview
              name={file.fileAttributes['name']}
              size={file.fileAttributes['size']}
              mimeType={file.fileAttributes['mimeType']}
              url={file.uri}
            >
              <button
                className="rounded-full bg-white print:hidden hover:text-red-500"
                onClick={() => dispatch({ type: 'REMOVE_FILE', payload: file })}
                title="Remove file"
              >
                <XCircleIcon className="w-6 h-6 " />
              </button>
            </FilePreview>
          ))}
      </div>
      <div>
        {files
          ?.filter((file) =>
            file.fileAttributes['mimeType']?.toLowerCase().startsWith('image/'),
          )
          .map((file) => (
            <FilePreview
              name={file.fileAttributes['name']}
              size={file.fileAttributes['size']}
              mimeType={file.fileAttributes['mimeType']}
              url={file.uri}
            >
              <button
                className="absolute top-4 right-4  rounded-full bg-white print:hidden hover:text-red-500"
                onClick={() => dispatch({ type: 'REMOVE_FILE', payload: file })}
                title="Remove file"
              >
                <XCircleIcon className="w-6 h-6 " />
              </button>
            </FilePreview>
          ))}
      </div>
    </section>
  );
}
