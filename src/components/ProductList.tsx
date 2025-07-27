import { products } from '../data/products';
import ProductCard from './ProductCard';
import { useSearchStore } from '../zustand/store/searchStore';
import { MdSearchOff } from 'react-icons/md';

const ProductList = () => {
  const search = useSearchStore(state => state.search);

  // Filter products by search text
  const filteredProducts = products.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="px-4 py-8 bg-gray-100 min-h-screen">

        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-indigo-700 tracking-wide drop-shadow-sm">🛒 Nayeem | ShopSmart Phone</h1>
          <p className="text-gray-600 text-md mt-2">Browse and explore our premium products</p>
        </header>
        <div className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
          {filteredProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center h-96 bg-white rounded-xl shadow-md">
          <MdSearchOff className="text-6xl text-gray-400 mb-4" />
          <p className="text-lg text-gray-600 font-medium">No products found</p>
        </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;


