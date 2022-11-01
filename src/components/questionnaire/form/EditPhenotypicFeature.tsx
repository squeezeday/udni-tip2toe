import { OntologyClass } from '../../../interfaces/phenopackets/schema/v2/core/base';
import { IQuestion, YesNoUnknown } from '../../../types';
import SelectNormal from './SelectNormal';

interface IProps {
  ontology: OntologyClass;
  value?: YesNoUnknown;
  onChange: (value: YesNoUnknown) => void;
}
export default function EditPhenotypicFeature({
  ontology,
  value,
  onChange,
}: IProps) {
  const { id, label } = ontology;
  return (
    <div>
      <div>
        <h3 className="m-0">{label}</h3>
        <p className="text-sm text-gray-500">{id}</p>
      </div>
      <div className="mt-4">
        <SelectNormal
          value={value}
          onChange={(v) => {
            onChange(v);
          }}
        />
      </div>
    </div>
  );
}
