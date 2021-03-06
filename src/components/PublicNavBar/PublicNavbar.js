import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Badge } from "@material-ui/core";
import Hamburger from "hamburger-react";
//import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../../redux/actions/auth.actions";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import "./App.css";

const PublicNavbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  const cart = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const getTotalItems = () => {
    return cart.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (e) => {
    console.log(e.currentTarget.value);
    setSearchTerm(e.currentTarget.value);
  };

  const handleOrderHistory = (e) => {
    navigate("/myorders");
  };

  const handleDashboard = (e) => {
    navigate("/admin/dashboard");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/?query=${searchTerm}`, { replace: true });
  };
  const [isOpen, setIsOpen] = useState(false);
  const authLinks = (
    <Nav>
      {/* <Nav.Link as={Link} to="/admin/profile">
       
      </Nav.Link> */}
      <Nav.Link>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          style={{
            color: "white",
            fontSize: "medium",
            padding: "0px 0px",
            margin: "0px 0px",
            letterSpacing: "2px",
          }}
        >
          {user?.name}
        </Button>
        {user && user.role === "user" ? (
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleOrderHistory}>Order History</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        ) : (
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleDashboard}>DashBoard</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        )}
      </Nav.Link>

      <Nav.Link as={Link} to="/cart">
        <Badge badgeContent={getTotalItems()} color="secondary">
          <FontAwesomeIcon
            icon={faShoppingBasket}
            style={{ fontSize: "25px" }}
          />
        </Badge>
      </Nav.Link>
    </Nav>
  );
  const publicLinks = (
    <Nav className=" align-items-center">
      <Nav.Link as={Link} to="/login">
        LOGIN
      </Nav.Link>
      <Nav.Link as={Link} to="/cart">
        <Badge badgeContent={getTotalItems()} color="secondary">
          <FontAwesomeIcon
            icon={faShoppingBasket}
            style={{ fontSize: "25px" }}
          />
        </Badge>
      </Nav.Link>
    </Nav>
  );

  const input = (
    <form className="input-wrap" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search..."
        className="input-text"
        onChange={handleSearch}
      ></input>
      <FontAwesomeIcon className="iconSearch" icon={faSearch} />
    </form>
  );

  return (
    <Navbar bg="navbar-color navbar-size " expand="sm">
      <Navbar.Brand as={Link} to="/" bsPrefix="brand">
        EMBECA
        {/* <img src={logo} alt="CoderSchool" width="120px" /> */}
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        //bsPrefix="navbar-toggler hamburger-button"
      >
        {<Hamburger toggled={isOpen} toggle={setIsOpen} />}
      </Navbar.Toggle>

      <Navbar.Collapse
        id="basic-navbar-nav"
        bsPrefix="navbar-collapse collapse bar-center"
      >
        {
          <Nav className=" align-items-center navbar_link ">
            <Nav.Link as={Link} to="/">
              HOME
            </Nav.Link>
            <Nav.Link as={Link} to="/makeup">
              MAKEUP
            </Nav.Link>
            <Nav.Link as={Link} to="/skincare">
              SKINCARE
            </Nav.Link>
            <Nav.Link as={Link} to="/community">
              BEAUTY
            </Nav.Link>
            {input}
          </Nav>
        }
        {!loading && <>{isAuthenticated ? authLinks : publicLinks}</>}
      </Navbar.Collapse>
    </Navbar>
  );
};
export default PublicNavbar;
