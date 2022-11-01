import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import { ICustomFormData } from '../../types';

export default function YearMonthPicker(
  props: UseControllerProps<ICustomFormData>,
) {
  const { field } = useController(props);
  const years: number[] = [new Date().getFullYear()];
  for (let i = 1; i < 100; i++) {
    years.push(years[0] - i);
  }
  const [year, setYear] = useState(
    props.defaultValue?.toString().substring(0, 4) || '',
  );
  const [month, setMonth] = useState(
    props.defaultValue?.toString().substring(5, 2) || '',
  );

  useEffect(() => {
    if (!year.length || !month.length) {
      field.onChange(undefined);
    } else {
      field.onChange(new Date(parseInt(year), parseInt(month) - 1, 1, 0, 0, 0));
    }
  }, [year, month]);

  return (
    <div className="space-x-2">
      <select
        name="year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        className="w-24 p-2 rounded border border-gray-300 shadow-sm focus:border-udni-teal focus:ring-4 focus:outline-none focus:ring-udni-teal-100"
      >
        <option value="">Year</option>
        {years.map((x) => (
          <option key={x} value={x}>
            {x}
          </option>
        ))}
      </select>
      <select
        value={month}
        name="month"
        onChange={(e) => setMonth(e.target.value)}
        className="w-24 p-2 rounded border border-gray-300 shadow-sm focus:border-udni-teal focus:ring-4 focus:outline-none focus:ring-udni-teal-100"
      >
        <option value="">Month</option>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((x) => (
          <option key={x} value={x}>
            {dayjs(`2000-${x}-1`).format('MMM')}
          </option>
        ))}
      </select>
    </div>
  );
}
