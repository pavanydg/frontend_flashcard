import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function () {
  const [user, setUser] = useState("");
  const [drop, setDrop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    if (token) {
      try {
        const decodedToken = parseJwt(token);
        const user = decodedToken.username;
        setUser(user);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("jwtToken");
    navigate("/signin");
  };

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Failed to parse JWT:", error);
      return null;
    }
  };

  return (
    <div className="font-outfit bg-black">
      <nav className="bg-black border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between mx-auto">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <span className="text-2xl font-semibold text-red-600">
                LearnCardPro
              </span>
            </Link>
          </div>

          {/* Menu for Larger Screens */}
          <div className="hidden md:flex items-center text-white space-x-4">
            <div
              className="flex items-center gap-1 hover:text-gray-200 cursor-pointer"
              onClick={() => navigate("/create")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              New Card
            </div>

            <div
              className="flex items-center gap-1 hover:text-gray-200 cursor-pointer"
              onClick={() => navigate("/edit")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
              Edit Cards
            </div>

            <div className="relative">
              <div
                className="flex items-center gap-1 hover:text-gray-300 cursor-pointer"
                onClick={() => setDrop(!drop)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-8 w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
                <div className="flex items-center">
                  {user}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
              {drop && (
                <div className="absolute right-0 mt-2 bg-black w-[150px] p-2 rounded-lg shadow-lg">
                  <div
                    className="bg-red-500 flex rounded-lg w-full text-center h-8 items-center justify-center hover:bg-red-600 text-white cursor-pointer"
                    onClick={logout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Hamburger Menu for Smaller Screens */}
          <div className="md:hidden flex items-center">
            <button
              className="text-white hover:text-gray-300 focus:outline-none"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 6h15M4.5 12h15m-15 6h15"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden flex flex-col items-center mt-4 space-y-2 text-white">
            <div
              className="flex items-center gap-1 hover:text-gray-200 cursor-pointer"
              onClick={() => navigate("/create")}
            >
              New Card
            </div>

            <div
              className="flex items-center gap-1 hover:text-gray-200 cursor-pointer"
              onClick={() => navigate("/edit")}
            >
              Edit Cards
            </div>

            <div className="relative w-full">
              <div
                className="flex items-center gap-1 hover:text-gray-300 cursor-pointer justify-center"
                onClick={() => setDrop(!drop)}
              >
                <div className="flex items-center justify-center">
                  {user}
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </div>
              {drop && (
                <div className="mt-2 bg-black w-full p-2 rounded-lg shadow-lg">
                  <div
                    className="bg-red-500 flex rounded-lg w-full text-center h-8 items-center justify-center hover:bg-red-600 text-white cursor-pointer"
                    onClick={logout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
