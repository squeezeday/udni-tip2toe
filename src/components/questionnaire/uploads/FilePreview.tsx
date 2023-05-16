import { PaperClipIcon } from '@heroicons/react/24/outline';
import { filesize } from 'filesize';

interface IProps {
  name: string;
  mimeType?: string;
  size: number | string;
  url: string;
  children?: React.ReactNode;
}
export default function FilePreview({
  name,
  mimeType,
  size,
  url,
  children,
}: IProps) {
  if (mimeType?.toLowerCase().startsWith('image/') !== true) {
    return (
      <p className="flex space-x-2 items-center my-2" key={url}>
        <PaperClipIcon className="w-5 h-5" />
        <a href={url}>{name}</a>
        <span>{filesize(size).toString()}</span>
        {children}
      </p>
    );
  }
  return (
    <figure
      className="relative h-52 w-52 flex items-center justify-center overflow-hidden"
      key={url}
    >
      <img src={`${url}`} className="object-contain max-h-full" />
      {children}
    </figure>
  );
}
