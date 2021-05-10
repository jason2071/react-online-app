import React from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import logo from "../assets/logo.svg";

function NavBar(props) {
  const history = useHistory();

  const [profile, setProfile] = React.useState(null);

  React.useEffect(() => {
    getProfile();
  }, []);

  function getProfile() {
    const profileValue = JSON.parse(localStorage.getItem("profile"));
    if (profileValue) {
      setProfile(profileValue);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    // props.saveToken(null);
    // props.saveProfile(null);
    history.go(0);
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <NavLink className="navbar-brand" to="/" exact>
        <img
          src={logo}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />
        React-Bootstrap
      </NavLink>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink className="nav-link" to="/" exact>
            Home
          </NavLink>
          <NavLink className="nav-link" to="/product">
            Product
          </NavLink>
          <NavLink className="nav-link" to="/about">
            About
          </NavLink>

          <NavDropdown
            title="Workshop (Pagination + CRUD)"
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item onClick={() => history.replace("/hospital")}>
              Hospitals (Pagination)
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={() => history.replace("/category")}>
              News Category (CRUD)
            </NavDropdown.Item>
          </NavDropdown>

          <NavLink className="nav-link" to="/upload">
            Upload
          </NavLink>

          <NavLink className="nav-link" to="/member">
            Member
          </NavLink>
        </Nav>

        {profile ? (
          <span className="navbar-text text-white">
            Welcome {profile.name}
            <Button className="btn btn-danger ml-2 btn-sm" onClick={logout}>
              Logout
            </Button>
          </span>
        ) : (
          <>
            <Nav>
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </Nav>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
