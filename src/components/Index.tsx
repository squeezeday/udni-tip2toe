import { useStateMachine } from 'little-state-machine';
import { Link, useNavigate } from 'react-router-dom';
import resetAction from '../actions/resetAction';
import updateAction from '../actions/updateAction';

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
      <div className="home flex flex-col h-full w-full items-center justify-center p-4 text-center">
        <h2 className="my-16 max-w-xl">
          Questionnaire for the Undiagnosed Diseases Network International
          Diagnostic Working Group
        </h2>

        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 items-center my-8">
          {Object.keys(state?.phenoPacket ?? {}).length ? (
            <>
              <Link to="/form/individual" className="btn">
                Continue questionnaire
              </Link>
              <button className="btn secondary" onClick={reset}>
                Reset and start new questionnaire
              </button>
            </>
          ) : (
            <>
              <Link to="/form/individual" className="btn my-4">
                Start questionnaire
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
