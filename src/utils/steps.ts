import sections from '../sections';

interface IMenuItem {
  label: string;
  url: string;
}

const steps: IMenuItem[] = [
  { label: 'Individual', url: '/form/individual' },
  { label: 'Photographs', url: '/form/photographs' },
  { label: 'Pedigree', url: '/form/pedigree' },
  { label: 'Growth Charts', url: '/form/growth-charts' },
  { label: 'X-Ray/MRI/CT', url: '/form/xray-mri-ct' },
  { label: 'Laboratory', url: '/form/laboratory' },
  ...sections.map((section) => ({
    label: section.chapter,
    url: `/form/step/${section.slug}`,
  })),
  { label: 'Summary', url: '/form/summary' },
];

export default steps;
