import { CheckBadgeIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

export default function ApiStatus() {
  const [status, setStatus] = useState<'offline' | 'connecting' | 'online'>(
    'offline',
  );
  useEffect(() => {
    const checkStatus = async () => {
      setStatus('connecting');
      const VITE_APIURL = import.meta.env.VITE_APIURL;
      if (VITE_APIURL) {
        const res = await fetch(`${VITE_APIURL}/status`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
          setStatus('online');
        } else {
          setStatus('offline');
        }
      }
    };

    checkStatus();
  }, []);

  switch (status) {
    case 'online':
      return (
        <div className="bg-white flex flex-row items-center justify-center text-green-700 p-1 px-2 rounded">
          <CheckBadgeIcon className=" w-5 h-5 mr-1" /> <span>API online</span>
        </div>
      );
    case 'offline':
      return (
        <div className="bg-red-700 text-white p-1 px-2 rounded">
          API offline
        </div>
      );
    default:
      return (
        <div className="bg-yellow-500 text-white p-1 px-2 rounded">
          Connecting to API..
        </div>
      );
  }
}
