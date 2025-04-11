import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-sm">
      <div className="container-fluid">
        <Link className="navbar-brand logo" to="/">
          <span className="logo_Blog_Color">OPEN</span>&nbsp;
          <span className="logo_color">SOURCE</span>
        </Link>

        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
        >
          <span className="navbar-toggler-icon bg-light"></span>
        </button>

        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav navbar_list mx-auto">
            <li className="nav-item navbar_nav-item">
              <NavLink className="nav-link navbar_links" to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item navbar_nav-item">
              <NavLink className="nav-link navbar_links" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item navbar_nav-item">
              <NavLink className="nav-link navbar_links" to="/services">
                Services
              </NavLink>
            </li>
            {/* <li className="nav-item navbar_nav-item">
              <NavLink className="nav-link navbar_links" to="/contact">
                Contact
              </NavLink>
            </li> */}
          </ul>

          <div className="dropdown ms-auto">
            <button
              className="btn btn-outline navbar_login_button dropdown-toggle"
              type="button"
              id="dropdownLoginButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Login
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownLoginButton">
            <li>
                <Link className="dropdown-item" to="/maintainers">
                  Maintainers
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/contributors">
                  Contributors
                </Link>
              </li>
            </ul>
      
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
