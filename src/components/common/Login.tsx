import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { RxCross2 } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../firebase/firebaseConfig";

type LoginData = {
  email: string;
  password: string;
};

const Login = () => {

  const [data, setData] = useState<LoginData>({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Local storage or state set
    localStorage.setItem("token", "loggedIn");
    console.log(user)

    navigate("/");
  } catch (err) {
    if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("Google login failed!");
    }
  }
};


  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      localStorage.setItem("token", "loggedIn");
      navigate("/");
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
      <div className="bg-white w-full sm:w-[400px] rounded-2xl p-6 shadow-xl relative">

        <form onSubmit={submitHandler}>
          {/* Close Icon */}
          <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl">
            <Link to={"/"}><RxCross2 /></Link>
          </button>

          {/* Header */}
          <h2 className="text-2xl font-bold text-indigo-600 mb-2 text-center">Welcome Back!</h2>
          <p className="text-gray-500 text-sm mb-5 text-center">Log in to your account</p>

          {/* Input Fields */}
          <div className="flex flex-col gap-4">
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
              "Login"
            )}
          </button>
          </div>
        </form>

        {error && (
          <p className="text-sm text-red-500 text-center mt-3">{error}</p>
        )}

        {/* Or */}
        <div className="flex items-center gap-3 my-3">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <div className="flex flex-col gap-3">
          <button 
          onClick={handleGoogleLogin}
          className="flex items-center justify-center font-medium gap-2 bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-100 transition">
            <FcGoogle className="text-xl" /> Continue with Google
          </button>

          <button className="flex items-center justify-center font-medium gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition">
            <FaFacebook className="text-xl" /> Continue with Facebook
          </button>
        </div>

        {/* Link to Sign Up */}
        <div className="flex justify-center mt-5">
          <Link to={"/signup"}>
            <p className="font-bold text-sm text-gray-500 hover:text-indigo-700 cursor-pointer">
              Don't have an account? Sign up now!
            </p>
          </Link>
        </div>

        {/* Footer Text */}
        <p className="text-[12px] text-center text-gray-400 mt-4">
          By logging in, you agree to our{" "}
          <span className="text-pink-500">Terms and Conditions</span> and{" "}
          <span className="text-pink-500">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default Login;


