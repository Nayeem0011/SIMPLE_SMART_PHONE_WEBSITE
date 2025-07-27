import { useCartStore } from '../zustand/store/store';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const navigate = useNavigate();
  const cart = useCartStore(state => state.cart);
  const addToCart = useCartStore(state => state.addToCart);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const deleteFromCart = useCartStore(state => state.deleteFromCart);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-3xl mx-auto mt-10 rounded-xl w-full h-[80vh] bg-white shadow-2xl p-0 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h1 className="text-2xl font-bold text-indigo-600">Your Ttems</h1>
        <button onClick={() => navigate("/")}>
          <RxCross2 size={24} className="text-gray-600 hover:text-black" />
        </button>
      </div>

      {/* Scrollable Cart Items */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
            <p className="text-center text-gray-500">There are no items in this cart</p>

            <button 
            onClick={() => navigate("/")} 
            className="border border-indigo-500 text-indigo-500 w-60 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition duration-200">
              CONTINUE SHOPPING
            </button>
          </div>
          ) : (
            <ul className="space-y-6">
              {cart.map(item => (
                <li key={item.id} className="border p-4 rounded-lg shadow-sm flex gap-4">
                  <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />

                  <div className="flex-1">
                    <p className="text-sm text-gray-500">ID: {item.id}</p>
                    <h2 className="font-semibold text-lg">{item.title}</h2>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                    <p className="text-sm text-indigo-500">Category: {item.category}</p>
                    <p className="text-md font-semibold">
                      $ {item.price} x {item.quantity} = $ {(item.price * item.quantity).toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button className="p-1 bg-gray-200 hover:bg-gray-300 rounded" onClick={() => removeFromCart(item.id)}>
                        <FaMinus />
                      </button>

                      <span>{item.quantity}</span>
                      <button className="p-1 bg-gray-200 hover:bg-gray-300 rounded" onClick={() => addToCart(item)}>
                        <FaPlus />
                      </button>

                      <button className="ml-auto text-red-500 hover:text-red-700" onClick={() => deleteFromCart(item.id)}>
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
        )}
      </div>

      {/* Footer */}
      {cart.length > 0 && (
        <div className="border-t px-6 py-4">
          <h2 className="text-xl font-bold text-right">Total: $ {total.toFixed(2)}</h2>
          <Link to={"/ordersection"}>
          <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">
            Order Now
          </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;


