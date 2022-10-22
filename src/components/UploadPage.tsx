import UploadWidget from './form/UploadWidget';

interface IProps {
  title: string;
  name: string;
}
export default function UploadPage({ title, name }: IProps) {
  return (
    <>
      <h2>{title}</h2>
      <UploadWidget section={name} />
    </>
  );
}
