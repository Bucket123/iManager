import { useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    //<div className="min-h-screen bg-white text-black">
      <div className="min-h-screen bg-white text-black bg-animated">
      {/* Navbar */}
      <div className="border-b border-black px-8 py-4 flex justify-between items-center">
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          iManager
        </h1>

        {localStorage.getItem("token") && (
          <button
            onClick={handleLogout}
            className="border border-black px-4 py-1 hover:bg-black hover:text-white transition"
          >
            Logout
          </button>
        )}
      </div>

      {/* Page Content */}
      <div className="px-8 py-6 max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}

export default Layout;
