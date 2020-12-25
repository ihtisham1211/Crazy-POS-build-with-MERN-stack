import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import "./styles/modelCreateUser.scss";
import { createUser } from "../actions/user";
import PropTypes from "prop-types";
import Alert from "./Alert";

const ModelCreateUser = ({ open, onClose, createUser }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    userType: "",
  });

  const { name, email, password, userType } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createUser(name, email, password, userType);
  };

  const modalRef = useRef();
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };
  if (!open) return null;

  return (
    <div className="Overlay" ref={modalRef} onClick={closeModal}>
      <div className="ModelCreateProduct">
        <form
          className="AddProductForm"
          onSubmit={(e) => {
            onSubmit(e);
          }}
        >
          <input
            className="modal_tfield"
            placeholder="Name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          ></input>
          <input
            className="modal_tfield"
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          ></input>
          <input
            className="modal_tfield"
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            required
          ></input>

          <select
            className="modal_btn"
            name="userType"
            value={userType}
            onChange={(e) => onChange(e)}
            required
          >
            <option></option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          <input type="submit" className="modal__button" value="Create User" />
          <button onClick={onClose} className="modal__button">
            Close
          </button>
        </form>
        <Alert />
      </div>
    </div>
  );
};

ModelCreateUser.propTypes = {
  createUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { createUser })(ModelCreateUser);
