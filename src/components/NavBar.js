import React, { useCallback } from "react";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import logo from "../assets/logo.svg";
import { updateProfile, updateToken } from "../redux/actions/profile.action";

function NavBar() {
  const history = useHistory();
  const dispatch = useDispatch();
  const profileRedux = useSelector((state) => state.profileReducer.profile);
  const cartRedux = useSelector((state) => state.cartReducer);

  const getProfile = useCallback(() => {
    const profileValue = JSON.parse(localStorage.getItem("profile"));
    if (profileValue) {
      dispatch(updateProfile(profileValue));
    }
  }, [dispatch]);

  React.useEffect(() => {
    getProfile();
  }, [getProfile]);

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    dispatch(updateProfile(null));
    dispatch(updateToken(null));
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

          <NavLink className="nav-link" to="/cart">
            Cart {cartRedux.total}
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

        {profileRedux ? (
          <span className="navbar-text text-white">
            Welcome {profileRedux.name}
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
