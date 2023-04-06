import NavBar from './questionnaire/layouts/NavBar';

export default function Help() {
  return (
    <>
      <NavBar />
      <div className="container max-w-6xl p-4">
        <p className="">
          Questionnaire for the Undiagnosed Diseases Network International
          Diagnostic Working Group
        </p>

        <h2>Credits</h2>
        <h3>Source code/license</h3>
        <p>
          Source code is licensed MIT, available at{' '}
          <a href="https://github.com/squeezeday/udni-tip2toe">
            https://github.com/squeezeday/udni-tip2toe
          </a>{' '}
        </p>
        <h3>Backend source code/license</h3>
        <p>
          Source code is licensed MIT, available at{' '}
          <a href="https://github.com/squeezeday/phenopacket-api">
            https://github.com/squeezeday/phenopacket-api
          </a>{' '}
        </p>
        <h3>Human Phenotype Ontology</h3>
        <p>
          This service/product uses the Human Phenotype Ontology (version
          information). Find out more at{' '}
          <a href="http://www.human-phenotype-ontology.org">
            http://www.human-phenotype-ontology.org
          </a>
        </p>
      </div>
    </>
  );
}
