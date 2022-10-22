import { ChevronRightIcon } from '@heroicons/react/24/solid';

interface IProps {
  disabled?: boolean;
}
export default function NextButton({ disabled }: IProps) {
  return (
    <button type="submit" className={`btn`} disabled={disabled}>
      Next <ChevronRightIcon className="w-4" />
    </button>
  );
}
