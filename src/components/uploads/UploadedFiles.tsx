import { XCircleIcon } from '@heroicons/react/24/solid';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

interface IProps {
  section: string;
}
export default function UploadedFiles({ section }: IProps) {
  const { state, dispatch } = useContext(AppContext);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {state.phenoPacket?.files
          ?.filter((x) => x.fileAttributes['section'] === section)
          .map((file) => (
            <figure
              className="relative h-52 w-52 flex items-center justify-center"
              key={file.uri}
            >
              {file.fileAttributes['mimeType']
                ?.toLowerCase()
                .startsWith('image/') && (
                <img
                  src={`${file.uri}`}
                  className="object-contain max-h-full max-w-full"
                />
              )}
              <button
                className="absolute top-4 right-4  rounded-full bg-white print:hidden hover:text-red-500"
                onClick={() => {
                  if (confirm('Remove file?'))
                    dispatch({ type: 'REMOVE_FILE', payload: file });
                }}
                title="Remove file"
              >
                <XCircleIcon className="w-6 h-6 " />
              </button>
            </figure>
          ))}
      </div>
    </>
  );
}
