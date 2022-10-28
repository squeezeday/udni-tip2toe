import { useStateMachine } from 'little-state-machine';
import { Link, useNavigate } from 'react-router-dom';
import resetAction from '../actions/resetAction';
import updateAction from '../actions/updateAction';
import {
  DocumentPlusIcon,
  DocumentArrowDownIcon,
} from '@heroicons/react/24/outline';
import ContinueForm from './ContinueForm';

export default function Home() {
  const { actions, state } = useStateMachine({ updateAction, resetAction });

  const navigate = useNavigate();

  const reset = () => {
    if (confirm('Clear existing data?')) {
      actions.resetAction();
      navigate('/form/individual');
    }
  };
  return (
    <>
      <div className="home p-4 max-w-6xl mx-auto">
        <div className="items-center justify-center  flex flex-col">
          <h2 className="my-16 max-w-xl">
            Questionnaire for the
            <br />
            <span className="text-udni-teal">
              Undiagnosed Diseases Network International
            </span>
            <br />
            Diagnostic Working Group
          </h2>
        </div>
        <div className="flex flex-col md:flex-row md:divide-x divide-udni-teal">
          <div className="w-full p-8   flex flex-col items-center my-5 group">
            <div className="flex items-center space-x-2">
              <DocumentPlusIcon className="w-5 text-udni-teal" />{' '}
              <h3>Start new form</h3>
            </div>
            <p className="text-gray-600 text-sm">
              For physicians, geneticists. Start questionnare.
            </p>
            <Link
              to="/questionnaire"
              className="border rounded p-3 px-6 mt-5 border-udni-teal text-udni-teal uppercase text-sm font-bold hover:bg-udni-teal hover:text-white"
            >
              Start new
            </Link>
          </div>
          <div className="w-full p-8   flex flex-col items-center my-5 ">
            <div className="flex items-center space-x-2">
              <DocumentArrowDownIcon className="w-5 text-udni-teal" />
              <h3>Continue form</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Add images, documents to an existing form.
            </p>
            <ContinueForm />
          </div>
        </div>
      </div>
    </>
  );
}
