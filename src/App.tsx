import { createStore } from 'little-state-machine';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Help from './components/Help';
import Index from './components/Index';
import NotFound from './components/NotFound';
import Individual from './components/questionnaire/EditIndividual';
import { Phenopacket } from './interfaces/phenopackets/schema/v2/phenopackets';
import Summary from './components/questionnaire/Summary';
import QuestionnaireLayout from './components/questionnaire/layouts/Layout';
import Questionnaire from './components/questionnaire/Index';
import FormSectionPage from './components/questionnaire/FormSectionPage';

const phenoPacket: Partial<Phenopacket> = {};

createStore({ phenoPacket, files: [] }, { storageType: localStorage });

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/help" element={<Help />} />
        <Route path="/questionnaire" element={<QuestionnaireLayout />}>
          <Route index element={<Questionnaire />} />
          <Route path="overview" element={<Questionnaire />} />
          <Route path="individual" element={<Individual />} />
          <Route path=":slug" element={<FormSectionPage />} />
          <Route path="summary" element={<Summary />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
