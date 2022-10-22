import { createStore } from 'little-state-machine';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

const phenoPacket: Partial<Phenopacket> = {};

createStore({ phenoPacket, files: [] }, { storageType: localStorage });

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/help" element={<Help />} />
        <Route path="/form" element={<Layout />}>
          <Route path="individual" element={<Individual />} />
          <Route
            path="photographs"
            element={<UploadPage title="Photographs" name="photographs" />}
          />
          <Route
            path="pedigree"
            element={<UploadPage title="Pedigree" name="pedigree" />}
          />
          <Route
            path="growth-charts"
            element={<UploadPage title="Growth Charts" name="growth-charts" />}
          />
          <Route
            path="xray-mri-ct"
            element={<UploadPage title="X-Ray/MRI/CT" name="xray-mri-ct" />}
          />
          <Route
            path="laboratory"
            element={<UploadPage title="Laboratory" name="laboratory" />}
          />
          <Route path="step/:slug" element={<Step />} />
          <Route path="summary" element={<Summary />} />
        </Route>
        <Route path="/phenopacket/:id" element={<ViewPhenopacket />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
