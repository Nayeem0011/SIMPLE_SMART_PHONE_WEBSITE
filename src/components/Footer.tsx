import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-500 mb-4">Nayeem | ShopSmart Phone</h2>
          <p className="text-sm text-gray-400">
            Find your favorite products, shop with ease, and enjoy! Thank you for staying with us
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="https://nayeem-portfolio-website-01.netlify.app/" className="hover:text-white transition">Portfolio</a></li>
            <Link to={"/"}><li className="hover:text-white transition"> Home</li></Link>
            <Link to={"/contact"}><li className="hover:text-white transition">Conract</li></Link>
            <Link to={"/about"}><li className="hover:text-white transition">About</li></Link>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact</h3>
          <p className="text-gray-400 text-sm">Email: sknayeemislam384@gmail.com</p>
          <p className="text-gray-400 text-sm">Phone: +880 1852 705 818</p>
          <p className="text-gray-400 text-sm">Address: Dhaka, Bangladesh</p>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/sk.nayeem.922535" className="text-gray-400 hover:text-white"><i className="fab fa-facebook"></i> Facebook</a>
            <a href="https://www.instagram.com/sknayeem6906/" className="text-gray-400 hover:text-white"><i className="fab fa-instagram"></i> Instagram</a>
            <a href="https://github.com/Nayeem0011" className="text-gray-400 hover:text-white"><i className="fab fa-github"></i> GitHub</a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Nayeem | ShopSmart Phone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
