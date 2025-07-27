import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";

type FormData = {
  name: string;
  email: string;
  password: string;
  phoneNo: string;
};


const SignUp = () => {

    const [data, setData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    phoneNo: "",
  });
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  
const submitHandler = async (e: React.FormEvent) => {
  localStorage.setItem("token", "loggedIn");
  e.preventDefault();
  setError(null);
  setLoading(true);

  try {
    await createUserWithEmailAndPassword(auth, data.email, data.password);
    localStorage.setItem("token", "loggedIn");
    navigate("/login"); // Login Page 
  } catch (err) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Something went wrong!");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-2">
      <form className="bg-white w-full sm:w-[400px] rounded-2xl p-6 shadow-xl relative"
      onSubmit={submitHandler}>
        
        {/* Close Icon */}
        <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl">
          <Link to={"/"}><RxCross2 /></Link>
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-indigo-600 mb-2 text-center">Welcome!</h2>
        <p className="text-gray-500 text-sm mb-5 text-center">Create an Account</p>

        {/* Input Fields */}
        <div className="flex flex-col gap-4">
          <input
            value={data.name}
            onChange={changeHandler}
            type="text"
            name="name"
            placeholder="Full Name"
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"/>

          <input
            value={data.email}
            onChange={changeHandler}
            type="email"
            name="email"
            placeholder="Email"
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"/>

          <input
            value={data.password}
            onChange={changeHandler}
            type="password"
            name="password"
            placeholder="Password"
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"/>

          <input
            value={data.phoneNo}
            onChange={changeHandler}
            type="text"
            name="phoneNo"
            placeholder="Phone Number"
            required
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"/>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-md transition duration-300 flex justify-center items-center gap-2">
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </div>

        {error && (
          <p className="text-sm text-red-500 mt-2 text-center">{error}</p>
        )}

        {/* Link to Login */}
        <div className="flex justify-center mt-5">
          <Link to={"/login"}>
            <p className="font-bold text-sm text-gray-500 hover:text-indigo-600 cursor-pointer">
              Already have an account? Login here!
            </p>
          </Link>
        </div>

        {/* Footer Text */}
        <p className="text-[12px] text-center text-gray-400 mt-4">
          By signing up, you agree to our{" "}
          <span className="text-pink-500">Terms and Conditions</span> and{" "}
          <span className="text-pink-500">Privacy Policy</span>.
        </p>
        
      </form>
    </div>
  );
};

export default SignUp;



