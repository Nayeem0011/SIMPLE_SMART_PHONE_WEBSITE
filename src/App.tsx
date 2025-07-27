import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import SignUp from "./components/common/SignUp";
import Login from "./components/common/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Layout from "./layout/Layout";
import OrderSection from "./pages/OrderSection";
import PrivatePage from "./pages/PrivatePage";

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        {/* Layout routes with Navbar and Footer */}
        <Route element={<Layout />}>
          <Route path="/" element={<ProductList />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        {/* Standalone routes without Navbar and Footer */}
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/ordersection" element={<PrivatePage><OrderSection/></PrivatePage>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

