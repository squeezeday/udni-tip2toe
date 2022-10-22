import { NavLink } from 'react-router-dom';
import steps from '../utils/steps';

export default function Sidebar() {
  return (
    <>
      {steps.map(({ url, label }, i) => (
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
          {i + 1}. {label}
        </NavLink>
      ))}
    </>
  );
}
