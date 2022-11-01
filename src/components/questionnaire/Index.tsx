import Overview from './Overview';

export default function Questionnaire() {
  return (
    <div>
      <h2>Questionnaire</h2>
      <p>
        Step through each section. Some information might be difficult to
        obtain. In this case the local UDP referral should write "Not
        investigated".
      </p>
      <h3 className="mt-4">Overview</h3>
      <Overview />
    </div>
  );
}
