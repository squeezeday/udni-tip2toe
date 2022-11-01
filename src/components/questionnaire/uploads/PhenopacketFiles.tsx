import { File } from '../../../interfaces/phenopackets/schema/v2/core/base';

interface IProps {
  files: File[];
}
export default function PhenopacketFiles({ files }: IProps) {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {files.map((file) => (
          <a key={file.uri} href={file.uri} target="_blank">
            {file.uri}
          </a>
        ))}
      </div>
    </>
  );
}
