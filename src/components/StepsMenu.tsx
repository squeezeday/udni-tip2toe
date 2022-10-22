import { Menu } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/solid';
import { NavLink } from 'react-router-dom';
import steps from '../utils/steps';

export default function StepsMenu() {
  return (
    <Menu>
      <Menu.Button className="flex flex-row w-full items-center p-2 border rounded text-gray-500">
        <Bars3Icon className="h-5 w-5 mr-2" /> Show menu
      </Menu.Button>
      <Menu.Items className="absolute left-2 z-50 h-96 top-16 p-1 right-2 overflow-y-auto  divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transform opacity-100 scale-100">
        {steps.map(({ url, label }, i) => (
          <Menu.Item key={url}>
            {({ active }) => (
              <NavLink
                className={`text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm ${
                  active && 'bg-udni-teal text-white'
                }`}
                to={url}
              >
                {i + 1}/{steps.length} {label}
              </NavLink>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
}
