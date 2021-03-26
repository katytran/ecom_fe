import React, { useState, useEffect } from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
import { Badge, Typography } from "@material-ui/core";
import Hamburger from "hamburger-react";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import authActions from "../redux/actions/auth.actions";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const PublicNavbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const [hide, setHide] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
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

  // useEffect(() => {}, [hide]);
  const [isOpen, setOpen] = useState(false);
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
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Nav.Link>

      <Nav.Link as={Link} to="/cart">
        <Badge badgeContent={2} color="secondary">
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
        <Badge badgeContent={2} color="secondary">
          <FontAwesomeIcon
            icon={faShoppingBasket}
            style={{ fontSize: "25px" }}
          />
        </Badge>
      </Nav.Link>
    </Nav>
  );

  const input = (
    <div className="input-wrap">
      <input type="text" placeholder="Search..." className="input-text"></input>
    </div>
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
        children={<Hamburger toggled={isOpen} toggle={setOpen} />}
      />

      <Navbar.Collapse
        id="basic-navbar-nav"
        bsPrefix="navbar-collapse collapse bar-center"
      >
        {
          <Nav className=" align-items-center navbar_link ">
            <Nav.Link as={Link} to="/">
              HOME
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              MAKEUP
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              SKINCARE
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              SALE
            </Nav.Link>
            <Nav.Link as={Link} to="#" onClick={() => setHide(true)}>
              <FontAwesomeIcon icon={faSearch} />
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
