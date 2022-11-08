import { PrinterIcon } from '@heroicons/react/24/outline';
import NavButtons from './form/NavButtons';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import SubmitForm from './SubmitForm';
import Summary from './Summary';

export default function SummaryPage() {
  const { state } = useContext(AppContext);

  if (!state.customFormData && !state.phenoPacket?.phenotypicFeatures?.length) {
    return (
      <>
        <h2>No information yet</h2>
        <p>Please fill in form</p>
      </>
    );
  }

  return (
    <>
      <header className="flex justify-between items-center print:hidden">
        <div>
          <h2>Summary</h2>
        </div>
        <div>
          <button
            onClick={() => window.print()}
            className="ml-auto flex items-center border rounded p-2 px-4  border-udni-teal text-udni-teal uppercase text-sm font-bold hover:bg-udni-teal hover:text-white"
          >
            <PrinterIcon className="w-4 h-4 mr-2" />
            Print
          </button>
        </div>
      </header>
      <Summary
        phenoPacket={state.phenoPacket}
        customFormData={state.customFormData}
      />{' '}
      <SubmitForm />
      <NavButtons />
    </>
  );
}
