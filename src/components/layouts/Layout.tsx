import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import NavButtons from '../form/NavButtons';
import Sidebar from '../Sidebar';
import StepsMenu from '../StepsMenu';

export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <div className="mx-auto max-w-6xl">
        <div className="fixed top-16 bottom-16 hidden w-72 overflow-auto p-4 md:block">
          <Sidebar />
        </div>
        <div className="md:ml-72 p-4 pb-20">
          <div className="md:hidden">
            <StepsMenu />
          </div>
          <Outlet />
        </div>
      </div>
      <NavButtons />
    </>
  );
}
