import { File } from '../../../interfaces/phenopackets/schema/v2/core/base';

interface IProps {
  files?: File[];
}
export default function ViewPhotographs({ files }: IProps) {
  const photographs = files?.filter((file) =>
    file.fileAttributes['mimeType']?.toLowerCase().startsWith('image/'),
  );
  if (!photographs?.length) return <></>;
  return (
    <div className="">
      {photographs?.map((file, i) => (
        <figure
          className="flex items-center justify-center overflow-hidden"
          key={`file-img-${i}`}
        >
          <img src={file.uri} className="block object-contain max-h-full" />
        </figure>
      ))}
    </div>
  );
}
