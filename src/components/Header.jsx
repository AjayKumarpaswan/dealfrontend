import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-blue-400 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">DealRoom</Link>

        <button
          className="md:hidden block focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <nav
          className={`${
            isOpen ? 'block' : 'hidden'
          } md:flex space-x-0 md:space-x-6 flex-col md:flex-row absolute md:static bg-blue-600 md:bg-transparent top-16 left-0 w-full md:w-auto z-50 p-4 md:p-0`}
        >
          {user ? (
            <>
              <Link
                to="/deals"
                className="block px-3 py-2 hover:bg-blue-500 md:hover:bg-transparent md:hover:underline rounded"
                onClick={() => setIsOpen(false)}
              >
                Deals
              </Link>
              <Link
                to="/deal-room"
                className="block px-3 py-2 hover:bg-blue-500 md:hover:bg-transparent md:hover:underline rounded"
                onClick={() => setIsOpen(false)}
              >
                Deal Room
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="block px-3 py-2 bg-red-500 hover:bg-red-600 rounded text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 hover:bg-blue-500 md:hover:bg-transparent md:hover:underline rounded"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 hover:bg-blue-500 md:hover:bg-transparent md:hover:underline rounded"
                onClick={() => setIsOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
