import { Link } from "react-router-dom";
import type { Product } from "../types/Product";
import { useCartStore } from "../zustand/store/store";


type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const addToCart = useCartStore(state => state.addToCart);

  return (
    <div className="w-full p-2 sm:p-4">
      <div className="border rounded-2xl p-4 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white flex flex-col justify-between h-full">

        <div>
          <div className="relative h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden mb-4">
            
            {/* Image Section */}
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"/>

            <span className="absolute top-2 right-2 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full shadow">
              {product.category}
            </span>
          </div>

          {/* Product Info */}
          <div className="space-y-1">
            <p className="text-xs text-gray-400">ID: {product.id}</p>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">{product.title}</h2>
            <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
            <p className="text-md font-medium text-indigo-600 mt-2">${product.price}</p>
            <p className="text-sm italic text-gray-500">Category: {product.category}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mt-5">
          <button 
          onClick={() => addToCart({ ...product, quantity: 1 })}
          className="bg-indigo-500 text-white w-full py-2 rounded-lg font-semibold hover:bg-indigo-600 transition duration-200">
            Add To Cart
          </button>
          
          <button className="border border-indigo-500 text-indigo-500 w-full py-2 rounded-lg font-semibold hover:bg-indigo-50 transition duration-200">
            <Link to={`/product/${product.id}`}>View Details</Link>
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default ProductCard;

