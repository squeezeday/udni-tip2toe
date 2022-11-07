import { MinusCircleIcon } from '@heroicons/react/24/solid';
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
              {file.fileAttributes['mimetype']
                .toLowerCase()
                .startsWith('image/') && (
                <img
                  src={`${file.uri}`}
                  className="object-contain max-h-full max-w-full"
                />
              )}
              <button
                className="btn btn-sm absolute right-2 bottom-2 bg-white"
                onClick={() => {
                  dispatch({ type: 'REMOVE_FILE', payload: file });
                }}
              >
                <MinusCircleIcon className="h-4 w-4" /> Remove
              </button>
            </figure>
          ))}
      </div>
    </>
  );
}
