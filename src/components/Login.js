import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = async () => {
    // Validate empty fields
    setError("")
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      setError("");

      if (res.data.success) {
        login(res.data.token);

        alert("Login Successful ✅");

        navigate("/home");
      } else {
        setError("Email or Password are incorrect");
      }

    } catch (err) {
      console.error(err);

      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (

<div className="flex items-center justify-center min-h-screen">

  <div className="glass-card w-full max-w-md shadow-xl rounded-2xl p-8">

    <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
      Welcome Back 👋
    </h2>

    <input
      className="w-full p-3 border rounded-xl mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
      placeholder="Email"
      type="email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
    />

    <div className="relative mb-4">

      <input
        className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
        placeholder="Password"
        type={showPassword?"text":"password"}
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button
        type="button"
        onClick={()=>setShowPassword(!showPassword)}
        className="absolute right-3 top-3 bg-white text-blue-600"
      >
        {showPassword?<EyeOff size={18}/>:<Eye size={18}/>}
      </button>

    </div>

    {error && (
      <p className="text-red-500 text-sm mb-3 text-center">
        {error}
      </p>
    )}

    <button
      onClick={submit}
      disabled={loading}
      className="w-full btn-primary text-white py-3 rounded-xl font-medium shadow-md"
    >
      {loading?"Logging in...":"Login"}
    </button>

    <p className="text-center mt-5 text-gray-600">
      Don’t have an account?{" "}
      <Link to="/register" className="text-blue-600 font-semibold">
        Sign Up
      </Link>
    </p>

  </div>

</div>

);
}