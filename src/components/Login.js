import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    // Validate empty fields
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      // Clear previous errors
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

      // Handle backend errors
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Login
        </h2>

        {/* Email Input */}
        <input
          className="w-full p-3 border rounded-lg mb-3"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          className="w-full p-3 border rounded-lg mb-4"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        {/* Login Button */}
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
          onClick={submit}
          disabled={!email || !password}
        >
          Login
        </button>

        {/* Register Link */}
        <p className="text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}