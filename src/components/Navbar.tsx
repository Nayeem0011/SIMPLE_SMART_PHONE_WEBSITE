import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { useCartStore } from '../zustand/store/store';
import { useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { useSearchStore } from '../zustand/store/searchStore';
import { auth } from '../firebase/firebaseConfig';
import { useSignOut } from 'react-firebase-hooks/auth';

const Navbar = () => {
  const user = localStorage.getItem("token")
  const [signOut] = useSignOut(auth);
  const cart = useCartStore(state => state.cart);
  const [menuOpen, setMenuOpen] = useState(false);
  const search = useSearchStore(state => state.search);
  const setSearch = useSearchStore(state => state.setSearch);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const success = await signOut();
    if (success) {
      localStorage.removeItem("token");
      navigate("/login")
      window.location.reload(); // Reload or redirect as needed
    }
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-gray-700 focus:outline-none">
            <HiMenu />
          </button>
        </div>

        {/* Menu for large screen */}
        <div className="hidden md:flex items-center space-x-6 text-gray-700 font-semibold">
          <Link to="/" className="hover:text-indigo-500">Home</Link>
          <Link to="/about" className="hover:text-indigo-500">About</Link>
          <Link to="/contact" className="hover:text-indigo-500">Contact</Link>
        </div>

          <div className="relative w-80">
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
            type="text"
            placeholder="Search in Product"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-4 py-2 border border-gray-300 rounded-lg outline-none focus:border-indigo-400 hover:border-indigo-400 hover:bg-indigo-50 transition duration-200"/>
          </div>

        {/* Search + Cart + Auth */}
        <div className="hidden md:flex items-center space-x-4">

          {
            user?
            <button onClick={handleSignOut} className="text-gray-700 font-medium hover:text-indigo-500">Sign Out</button>:
            <>
            <Link to="/login" className="text-gray-700 font-medium hover:text-indigo-500">Login</Link>
            <Link to="/signup" className="text-gray-700 font-medium hover:text-indigo-500">Sign Up</Link>
            </>
          }

          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-2xl text-indigo-600" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 text-gray-700 font-medium">
          <Link to="/" className="block hover:text-indigo-500">Home</Link>
          <Link to="/about" className="block hover:text-indigo-500">About</Link>
          <Link to="/contact" className="block hover:text-indigo-500">Contact</Link>

          {
            user?
            <button onClick={handleSignOut} className="block text-gray-700 font-medium hover:text-indigo-500">Sign Out</button>:
            <>
            <Link to="/login" className="block text-gray-700 font-medium hover:text-indigo-500">Login</Link>
            <Link to="/signup" className="block text-gray-700 font-medium hover:text-indigo-500">Sign Up</Link>
            </>
          }

          <Link to="/cart" className="relative inline-block">
            <FaShoppingCart className="text-2xl text-indigo-600" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

        </div>
      )}
    </nav>
  );
};

export default Navbar;


