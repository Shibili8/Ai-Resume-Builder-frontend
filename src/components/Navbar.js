import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    navigate("/login");               
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur border-b shadow-sm">

      <div className="px-6 py-3 flex items-center justify-between">

        <h1
        className="text-xl font-bold text-blue-700 cursor-pointer"
        onClick={()=>navigate("/home")}
        >
        🚀 AI Resume Builder
        </h1>

        <button
        onClick={handleLogout}
        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow"
        >
        Logout
        </button>

      </div>

    </nav>
  );
}
