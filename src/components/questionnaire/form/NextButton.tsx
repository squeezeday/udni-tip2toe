import { ChevronRightIcon } from '@heroicons/react/24/solid';

export default function NextButton() {
  return (
    <div className="fixed left-0 right-0 bottom-0 bg-white border-t border-slate-200 ">
      <div className="flex px-4 h-16 justify-end items-center max-w-6xl mx-auto">
        <button
          type="submit"
          className="flex border rounded p-2 px-4  border-udni-teal text-udni-teal uppercase text-sm font-bold hover:bg-udni-teal hover:text-white"
        >
          Next <ChevronRightIcon className="w-4 ml-1 flex-none" />
        </button>
      </div>
    </div>
  );
}
