import sections from '../sections';

interface IMenuItem {
  label: string;
  url: string;
}

const steps: IMenuItem[] = [
  { label: 'Individual', url: '/questionnaire/individual' },
  ...sections.map((section) => ({
    label: section.chapter,
    url: `/questionnaire/${section.slug}`,
  })),
  { label: 'Summary', url: '/questionnaire/summary' },
];

export default steps;
