import {
  Individual,
  Sex,
  VitalStatus_Status,
} from '../../interfaces/phenopackets/schema/v2/core/individual';
interface IProps {
  individual: Individual;
}

interface Property {
  label: string;
  value?: string;
}

function getSex(sex?: Sex) {
  if (!sex) return '';
  switch (parseInt(sex?.toString())) {
    case Sex.UNKNOWN_SEX:
      return 'Unknown';
    case Sex.MALE:
      return 'Male';
    case Sex.FEMALE:
      return 'Female';
    case Sex.UNRECOGNIZED:
      return 'Unrecognized';
    case Sex.OTHER_SEX:
      return 'Other';
    default:
      return '';
  }
}
function getVitalStatus(status?: VitalStatus_Status) {
  if (!status) return '';
  switch (parseInt(status?.toString())) {
    case VitalStatus_Status.UNKNOWN_STATUS:
      return 'Unknown';
    case VitalStatus_Status.ALIVE:
      return 'Alive';
    case VitalStatus_Status.DECEASED:
      return 'Deceased';
    case VitalStatus_Status.UNRECOGNIZED:
      return 'Unrecognized';
    default:
      return '';
  }
}

export default function ViewIndividual({ individual }: IProps) {
  const properties: Property[] = [
    { label: 'Local UDP ID', value: individual.id },
    {
      label: 'Date of birth',
      value: individual.dateOfBirth?.toLocaleDateString(),
    },
    { label: 'Biological Sex', value: getSex(individual.sex) },
    {
      label: 'Vital status',
      value: getVitalStatus(individual.vitalStatus?.status),
    },
  ];
  return (
    <section>
      {properties.map((x) => (
        <div className="flex flex-col print:flex-row md:flex-row" key={x.label}>
          <div className="w-full">
            <h4 className="text-gray-500">{x.value}</h4>
          </div>
          <div className="w-full">
            <p>{x.value}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
