import {
  Link,
  useNavigate,
  useLocation
} from "react-router-dom";

import "../styles/Navbar.css";

export default function Navbar({
  search,
  setSearch
}) {

  const navigate = useNavigate();

  const location = useLocation();

  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");

  const isHome =
    location.pathname === "/";

  const isProjects =
    location.pathname === "/projects";

  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("role");

    alert("Logged out");

    navigate("/");
  };

  return (

    <nav className="navbar">

      {/* ===== LOGO ===== */}

      <div className="logo">

        <Link to="/">
          VENDORA
        </Link>

      </div>

      {/* ===== SEARCH BAR ONLY PROJECTS PAGE ===== */}

      {isProjects && (

        <div className="search-container">

          <input
            type="text"

            placeholder="Search Projects..."

            value={search}

            onChange={(e) =>
              setSearch(e.target.value)
            }

            className="search-bar"
          />

        </div>
      )}

      {/* ===== NAVIGATION LINKS ===== */}

      <div className="nav-links">

        {/* BACK TO HOME */}

        {!isHome && (

          <Link
            to="/"
            className="back-btn"
          >
            ← Home
          </Link>
        )}

        <Link to="/">
          Home
        </Link>

        <Link to="/projects">
          Projects
        </Link>

        {/* ADMIN */}

        {token &&
          role === "ADMIN" && (

            <Link to="/admin/dashboard">
              Admin
            </Link>
          )}

        {/* LOGIN ONLY HOME PAGE */}

        {isHome && !token && (

          <Link
            to="/login"
            className="login-btn"
          >
            Login
          </Link>
        )}

        {/* LOGGED IN USER */}

        {token && (
          <>

            <Link to="/admin">
                 Dashboard
                    </Link>
            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>

          </>
        )}

      </div>

    </nav>
  );
}