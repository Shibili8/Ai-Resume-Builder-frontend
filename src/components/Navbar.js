import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    navigate("/login");               
  };

  return (
    <nav className="w-full bg-white shadow-sm border-b border-gray-200">
      <div className=" px-5 py-3 flex items-center justify-between">
        
        <h1 
          className="text-xl font-semibold text-gray-900 cursor-pointer"
          onClick={() => navigate("/")}
        >
          AI Resume Builder
        </h1>

        <button
          onClick={handleLogout}
          className="px-4 py-1.5 text-sm font-medium text-white bg-red-600 rounded-md shadow-sm hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
