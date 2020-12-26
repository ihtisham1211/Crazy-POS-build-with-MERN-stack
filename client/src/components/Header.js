import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import "./styles/header.scss";
import ModelCreateProduct from "./ModelCreateProduct";
import ModelCreateUser from "./ModelCreateUser";

const Header = ({ logout, usertype, user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <div className="header">
      <h2 className="header__title">Crazy POS </h2>
      <h1 className="header__subtitle">Manage your sales !</h1>
      {usertype === "admin" && (
        <div className="header_admin_div">
          <button
            className="header__button"
            onClick={() => {
              setIsOpen2(true);
            }}
          >
            Create User
          </button>

          <ModelCreateUser
            open={isOpen2}
            onClose={() => {
              setIsOpen2(false);
            }}
          ></ModelCreateUser>

          <button
            className="header__button"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Add Product
          </button>

          <ModelCreateProduct
            open={isOpen}
            onClose={() => {
              setIsOpen(false);
            }}
          ></ModelCreateProduct>
        </div>
      )}
      <button className="header__button" onClick={logout}>
        Log out
      </button>
    </div>
  );
};

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  usertype: PropTypes.string,
};
const mapStateToProps = (state) => ({
  usertype: state.auth.usertype,
});

export default connect(mapStateToProps, { logout })(Header);
