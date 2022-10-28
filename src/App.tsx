import { createStore } from 'little-state-machine';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Help from './components/Help';
import Index from './components/Index';
import NotFound from './components/NotFound';
import Individual from './components/Individual';
import ViewPhenopacket from './components/ViewPhenopacket';
import { Phenopacket } from './interfaces/phenopackets/schema/v2/phenopackets';
import Step from './components/Step';
import Summary from './components/Summary';
import NavBar from './components/layouts/NavBar';
import Layout from './components/layouts/Layout';
import UploadPage from './components/UploadPage';
import Questionnaire from './components/Questionnaire';

const phenoPacket: Partial<Phenopacket> = {};

createStore({ phenoPacket, files: [] }, { storageType: localStorage });

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/help" element={<Help />} />
        <Route path="/questionnaire" element={<Layout />}>
          <Route index element={<Questionnaire />} />
          <Route path="individual" element={<Individual />} />
          <Route path=":slug" element={<Step />} />
          <Route path="summary" element={<Summary />} />
        </Route>
        <Route path="/documents/:id" element={<UploadPage />} />
        {/* <Route path="/phenopacket/:id" element={<ViewPhenopacket />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
