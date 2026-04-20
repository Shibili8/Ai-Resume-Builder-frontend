import { useState, useContext } from "react";
import api from "../api";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const res = await api.post("/auth/register", { name, email, password });

    if (res.data.success) {
      alert("Signup Successful");
      navigate("/login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">

      <div className="glass-card w-full max-w-md shadow-xl rounded-2xl p-8">

      <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
      Create Account ✨
      </h2>

      <input
      className="w-full p-3 border rounded-xl mb-3"
      placeholder="Full Name"
      onChange={(e)=>setName(e.target.value)}
      />

      <input
      className="w-full p-3 border rounded-xl mb-3"
      placeholder="Email"
      onChange={(e)=>setEmail(e.target.value)}
      />

      <input
      className="w-full p-3 border rounded-xl mb-4"
      placeholder="Password"
      type="password"
      onChange={(e)=>setPassword(e.target.value)}
      />

      <button
      className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-medium"
      onClick={submit}
      >
      Sign Up
      </button>

      <p className="text-center mt-4 text-gray-600">
      Already have an account?{" "}
      <Link to="/login" className="text-blue-600 font-semibold">
      Login
      </Link>
      </p>

      </div>

    </div>
  );
}
