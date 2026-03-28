import { useContext, useState } from "react";
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

        {/* Password Input with Toggle */}
        <div className="relative mb-4">

          <input
            className="w-full p-3 border rounded-lg"
            placeholder="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-3 top-3 text-sm text-blue-600 bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent outline-none border-none"
          >
            {showPassword ? "Hide" : "Show"}
          </button>

        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {error}
          </p>
        )}

        {/* Login Button */}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "Logging in..." : "Login"}
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