import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import steps from '../../utils/steps';

export default function NavButtons() {
  const { pathname } = useLocation();

  const [next, setNext] = useState<string | undefined>();
  const [prev, setPrev] = useState<string | undefined>();

  useEffect(() => {
    const index = steps.findIndex((x) => x.url === location.pathname);
    setNext(index < steps.length - 1 ? steps[index + 1].url : undefined);
    setPrev(index > 0 ? steps[index - 1].url : undefined);
  }, [pathname]);

  return (
    <div className="fixed left-0 w-full bottom-0 bg-white border-t border-slate-200 ">
      <div className="flex px-4 h-16 justify-between items-center max-w-6xl mx-auto">
        {prev ? (
          <NavLink to={prev} className="btn">
            <ChevronLeftIcon className="w-4 h-4 mr-1 flex-none" />
            Previous
          </NavLink>
        ) : (
          <div></div>
        )}
        {next && (
          <NavLink className="btn" to={next}>
            Next <ChevronRightIcon className="w-4 ml-1 flex-none" />
          </NavLink>
        )}
      </div>
    </div>
  );
}
