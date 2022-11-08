import { XCircleIcon } from '@heroicons/react/24/outline';
import { File } from '../../../interfaces/phenopackets/schema/v2/core/base';
import FilePreview from './FilePreview';

interface IProps {
  files?: File[];
  onRemove?: (file: File) => void;
}
export default function ViewPhotographs({ files, onRemove }: IProps) {
  const photographs = files?.filter((file) =>
    file.fileAttributes['mimeType']?.toLowerCase().startsWith('image/'),
  );
  if (!photographs?.length) return <></>;
  return (
    <div className="grid grid-cols-4 gap-4 my-4">
      {photographs?.map((file) => (
        <FilePreview
          name={file.fileAttributes['name']}
          size={file.fileAttributes['size']}
          mimeType={file.fileAttributes['mimeType']}
          url={file.uri}
        >
          {onRemove ? (
            <button
              className="absolute top-4 right-4  rounded-full bg-white print:hidden hover:text-red-500"
              onClick={() => onRemove(file)}
              title="Remove file"
            >
              <XCircleIcon className="w-6 h-6 " />
            </button>
          ) : null}
        </FilePreview>
      ))}
    </div>
  );
}
