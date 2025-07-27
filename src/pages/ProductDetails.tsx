import { useNavigate, useParams } from 'react-router-dom';
import { products } from '../data/products';
import type { Product } from '../types/Product';
import { useCartStore } from '../zustand/store/store';
import { HiArrowLeft } from 'react-icons/hi';

const ProductDetails = () => {
    const addToCart = useCartStore(state => state.addToCart);
    
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product: Product | undefined = products.find(p => p.id === Number(id));

  if (!product) return <p className="text-center mt-10 text-red-500">Product not found!</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 mt-10 bg-white shadow-md rounded-xl">

      {/*Back Button */}
      <button
      onClick={() => navigate("/")}
      className="mb-6 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded flex items-center gap-2 transition">
      <HiArrowLeft className="text-xl" />
      Back
      </button>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={product.image}
          alt={product.title}
          className="w-full md:w-1/2 object-cover rounded-xl"/>

        <div className="flex-1 space-y-3">
          <h1 className="text-2xl font-bold text-gray-800">{product.title}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-indigo-600 text-xl font-semibold">${product.price}</p>
          <p className="italic text-gray-500">Category: {product.category}</p>
          
          <button 
          onClick={() => addToCart({ ...product, quantity: 1 })}
          className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 transition">
            Add To Cart
          </button>
        </div>

      </div>
    </div>
  );
};

export default ProductDetails;
