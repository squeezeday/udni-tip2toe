import { useEffect, useState } from 'react';
import { Outlet, useLocation, useOutletContext } from 'react-router-dom';
import tip2toeForm from '../../../tip2toeform';
import NavBar from './NavBar';
import Sidebar from './Sidebar';
import StepsMenu from './StepsMenu';

type NavContextType = { nextUrl: string | null; prevUrl: string | null };

export default function QuestionnaireLayout() {
  const { pathname } = useLocation();
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [prevUrl, setPrevUrl] = useState<string | null>(null);

  const formSections = tip2toeForm.formSections ?? [];

  useEffect(() => {
    const index = formSections.findIndex(
      (x) => x.slug === location.pathname.split('/').pop(),
    );
    setNextUrl(
      index < formSections.length - 1
        ? `/questionnaire/${formSections[index + 1].slug}`
        : null,
    );
    setPrevUrl(
      index > 0 ? `/questionnaire/${formSections[index - 1].slug}` : null,
    );
  }, [pathname]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <>
      <NavBar />
      <div className="mx-auto max-w-6xl">
        <div className="fixed top-16 bottom-16 hidden w-72 overflow-auto p-4 md:block">
          <Sidebar formSections={tip2toeForm.formSections} />
        </div>
        <div className="md:ml-72 p-4 pb-20">
          <div className="md:hidden print:hidden">
            <StepsMenu formSections={tip2toeForm.formSections} />
          </div>
          <Outlet context={{ nextUrl, prevUrl }} />
        </div>
      </div>
    </>
  );
}

export function useNextUrl() {
  return useOutletContext<NavContextType>();
}
