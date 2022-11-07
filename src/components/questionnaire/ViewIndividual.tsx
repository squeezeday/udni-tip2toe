import {
  Individual,
  Sex,
  VitalStatus_Status,
} from '../../interfaces/phenopackets/schema/v2/core/individual';
import { ICustomFormData } from '../../types';
interface IProps {
  individual: Individual;
  customFormData?: ICustomFormData;
}

interface IQV {
  question: string;
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

export default function ViewIndividual({ individual, customFormData }: IProps) {
  const answers: IQV[] = [
    { question: 'Local UDP ID', value: individual.id },
    { question: 'Biological Sex', value: getSex(individual.sex) },
    {
      question: 'Date of birth',
      value: individual.dateOfBirth?.toString(),
    },
    {
      question: 'Age at symptom onset',
      value: `${
        customFormData?.ageSymptomYears
          ? customFormData?.ageSymptomYears + ' years '
          : ''
      }${
        customFormData?.ageSymptomMonths
          ? customFormData?.ageSymptomMonths + ' months'
          : ''
      }`,
    },
    {
      question: 'Vital status',
      value: getVitalStatus(individual.vitalStatus?.status),
    },
    {
      question: 'Age of mother at time of referral',
      value: customFormData?.motherAge.toString(),
    },
    {
      question: 'Age of father at time of referral',
      value: customFormData?.fatherAge,
    },
    {
      question: 'Ethnicity of patient',
      value: customFormData?.ethnicity.toString(),
    },
    {
      question: 'Referring UDP',
      value: customFormData?.referringUdp.toString(),
    },
  ];
  return (
    <section>
      {answers
        .filter((x) => x.question && x.value)
        .map((x) => (
          <div
            className="flex flex-col print:flex-row md:flex-row"
            key={x.question}
          >
            <div className="w-full">
              <h4 className="text-gray-500">{x.question}</h4>
            </div>
            <div className="w-full">
              <p>{x.value}</p>
            </div>
          </div>
        ))}
    </section>
  );
}
