import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../zustand/store/store";
import { db } from "../firebase/firebaseConfig";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { RxCross2 } from "react-icons/rx";

const OrderSection = () => {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");

  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [deliveryInfo, setDeliveryInfo] = useState({
    address: "",
    city: "",
    postcode: "",
    note: "",
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrderSubmit = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    const order = {
      personalInfo,
      deliveryInfo,
      cartItems,
      paymentMethod,
      total,
      createdAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "orders"), order);
      clearCart();
      alert("✅ Order submitted successfully!");
      navigate("/");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("❌ Failed to submit order. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg border border-indigo-400">

      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 pt-1 pb-6">
        <h1 className="text-2xl font-bold text-indigo-600">Order Form</h1>
        <button onClick={() => navigate("/cart")}>
          <RxCross2 size={24} className="text-gray-600 hover:text-black" />
        </button>
      </div>

      {/* Step 1: Personal Information */}
      {step === 1 && (
        <div className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={personalInfo.name}
            onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
            className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"/>

          <input
            type="email"
            placeholder="Email Address"
            value={personalInfo.email}
            onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
            className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"/>

          <input
            type="tel"
            placeholder="Phone Number"
            value={personalInfo.phone}
            onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
            className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"/>

          <button
            onClick={() => setStep(2)}
            className="mt-4 w-full py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition">
            Next Step
          </button>
        </div>
      )}

      {/* Step 2: Delivery Information */}
      {step === 2 && (
        <div className="space-y-5">
          <input
            type="text"
            placeholder="Delivery Address"
            value={deliveryInfo.address}
            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, address: e.target.value })}
            className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"/>

          <input
            type="text"
            placeholder="City"
            value={deliveryInfo.city}
            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, city: e.target.value })}
            className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"/>

          <input
            type="text"
            placeholder="Postcode"
            value={deliveryInfo.postcode}
            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, postcode: e.target.value })}
            className="w-full border px-4 py-3 rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"/>

          <textarea
            placeholder="Additional Instructions (optional)"
            value={deliveryInfo.note}
            onChange={(e) => setDeliveryInfo({ ...deliveryInfo, note: e.target.value })}
            rows={3}
            className="w-full border px-4 py-3 rounded-md resize-none focus:ring-2 focus:ring-indigo-500 outline-none"/>

          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 transition">
              Back
            </button>

            <button
              onClick={() => setStep(3)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition">
              Next Step
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Order Summary */}
      {step === 3 && (
        <div>
          <h3 className="font-semibold text-lg mb-4">Order Items</h3>
          <div className="bg-indigo-50 border border-indigo-300 rounded-lg p-4 max-h-64 overflow-y-auto">
            {cartItems.length === 0 && (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            )}

            <ul className="divide-y divide-indigo-200">
              {cartItems.map((item, index) => (
                <li key={index} className="flex justify-between py-2">
                  <span className="font-medium">
                    {item.title} × {item.quantity}
                  </span>
                  <span className="font-semibold">৳ {item.quantity * item.price}</span>
                </li>
              ))}
            </ul>
            {cartItems.length > 0 && (
              <p className="text-right font-bold mt-4 text-indigo-700 text-lg">
                Total: ৳ {total.toFixed(2)}
              </p>
            )}
          </div>
          <div className="flex justify-between mt-6">
            <button
              onClick={() => setStep(2)}
              className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500">
              Back
            </button>

            <button
              onClick={() => setStep(4)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
              disabled={cartItems.length === 0}>
              Next Step
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Payment Method */}
      {step === 4 && (
        <div className="space-y-6">
          <p className="text-lg font-medium">Select Payment Method:</p>
          <div className="flex flex-col space-y-3">
            {["Cash on Delivery", "Nagad", "Bkash"].map((method) => (
              <label key={method} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="form-radio text-indigo-600"/>
                <span className="text-gray-700">{method}</span>
              </label>
            ))}
          </div>
          
          <div className="flex justify-between">
            <button
              onClick={() => setStep(3)}
              className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500">
              Back
            </button>

            <button
              onClick={handleOrderSubmit}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700">
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSection;