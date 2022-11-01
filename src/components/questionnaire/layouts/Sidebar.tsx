import { NavLink } from 'react-router-dom';
import { IFormSection } from '../../../types';

interface IProps {
  formSections?: IFormSection[];
}
export default function Sidebar({ formSections }: IProps) {
  return (
    <>
      {formSections?.map(({ slug, title }, i) => {
        const url = `/questionnaire/${slug}`;
        return (
          <NavLink
            key={url}
            className={({ isActive }) =>
              ` flex w-full items-center rounded-md text-sm p-2 ${
                isActive
                  ? 'bg-udni-teal text-white'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
              }`
            }
            to={url}
          >
            {i + 1}. {title}
          </NavLink>
        );
      })}
    </>
  );
}
