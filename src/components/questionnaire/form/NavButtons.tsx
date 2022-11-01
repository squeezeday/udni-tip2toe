import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { NavLink } from 'react-router-dom';
import { useNextUrl } from '../layouts/Layout';

export default function NavButtons() {
  const { nextUrl, prevUrl } = useNextUrl();

  return (
    <div className="fixed left-0 w-full bottom-0 bg-white border-t border-slate-200 print:hidden">
      <div className="flex px-4 h-16 justify-between items-center max-w-6xl mx-auto">
        {prevUrl ? (
          <NavLink
            to={prevUrl}
            className="flex border rounded p-2 px-4  border-udni-teal text-udni-teal uppercase text-sm font-bold hover:bg-udni-teal hover:text-white"
          >
            <ChevronLeftIcon className="w-4 h-4 mr-1 flex-none" />
            Previous
          </NavLink>
        ) : (
          <div></div>
        )}
        {nextUrl && (
          <NavLink
            className="flex border rounded p-2 px-4  border-udni-teal text-udni-teal uppercase text-sm font-bold hover:bg-udni-teal hover:text-white"
            to={nextUrl}
          >
            Next <ChevronRightIcon className="w-4 ml-1 flex-none" />
          </NavLink>
        )}
      </div>
    </div>
  );
}
