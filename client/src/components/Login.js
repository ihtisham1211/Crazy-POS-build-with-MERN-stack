import React, { useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../actions/auth";
import "./styles/login.scss";
import Alert from "./Alert";

const Login = ({ login, isAuthenticated, usertype }) => {
  // formData works like data holder variable and setFromData works as a state saver.
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if logined in
  if (isAuthenticated) {
    if (usertype === "admin") {
      return <Redirect to="/dashboardadmin" />;
    }
    if (usertype === "user") {
      return <Redirect to="/dashboarduser" />;
    }
  }

  return (
    <div className="login">
      <form className="login__form" onSubmit={(e) => onSubmit(e)}>
        <h1 className="login__title">Crazy POS</h1>
        <h2 className="login__subtitle">Sign In to Your Account</h2>
        <input
          className="login_tfield"
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          onChange={(e) => onChange(e)}
          required
        />

        <input
          className="login_tfield"
          type="password"
          placeholder="Password"
          name="password"
          minLength="6"
          value={password}
          onChange={(e) => onChange(e)}
          required
        />

        <input type="submit" className="login__button" value="Login" />
      </form>
      <Alert />
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  usertype: PropTypes.string,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  usertype: state.auth.usertype,
});
export default connect(mapStateToProps, { login })(Login);
