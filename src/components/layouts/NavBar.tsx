import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <header className="bg-udni-teal w-full sticky top-0 z-20 h-16 flex items-center">
      <div className="container max-w-6xl p-4 mx-auto flex justify-between">
        <div className="space-x-4">
          <Link to="/" className="text-white font-bold">
            UDNI tip2toe Questionnaire
          </Link>
          <Link to="/help" className="text-white">
            Help
          </Link>
        </div>
        <div></div>
      </div>
    </header>
  );
}
