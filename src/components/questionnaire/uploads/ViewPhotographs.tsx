import { XCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import { File } from '../../../interfaces/phenopackets/schema/v2/core/base';
import FilePreview from './FilePreview';

export default function ViewPhotographs() {
  const { state, dispatch } = useContext(AppContext);
  const [files, setFiles] = useState<File[] | undefined>();

  useEffect(
    () =>
      setFiles(
        state.phenoPacket?.files?.filter((x) =>
          x.fileAttributes['section'].startsWith('photographs'),
        ),
      ),
    [state?.phenoPacket?.files],
  );

  return (
    <div className="grid grid-cols-4 gap-2 my-4">
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
  );
}
