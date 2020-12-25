import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./styles/modelUpdateProduct.scss";
import Alert from "./Alert";
import { updateProduct } from "../actions/product";

const ModelUpdateProduct = ({
  open,
  onClose,
  id,
  name,
  price,
  quantity,
  brand,
  category,
  token,
  updateProduct,
}) => {
  const [formData, setFormData] = useState({
    name,
    price,
    quantity,
    brand,
    category,
  });

  // data setter
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: [e.target.value] });
  };

  //on submit
  const onSubmit = (e) => {
    e.preventDefault();

    updateProduct(
      id,
      formData.name.toString(),
      formData.price.toString(),
      formData.quantity.toString(),
      formData.brand.toString(),
      formData.category.toString(),
      token
    );
  };

  // model function
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
            name="name"
            value={formData.name}
            placeholder="Name"
            type="text"
            onChange={(e) => onChange(e)}
            required
          ></input>
          <input
            className="modal_tfield"
            placeholder="Price"
            type="number"
            name="price"
            value={formData.price}
            onChange={(e) => onChange(e)}
            required
          ></input>
          <input
            className="modal_tfield"
            placeholder="Quantity"
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={(e) => onChange(e)}
            required
          ></input>

          <input
            className="modal_tfield"
            placeholder="Brand"
            type="text"
            name="brand"
            value={formData.brand}
            onChange={(e) => onChange(e)}
          ></input>
          <input
            className="modal_tfield"
            placeholder="Category"
            type="text"
            name="category"
            value={formData.category}
            onChange={(e) => onChange(e)}
            required
          ></input>

          <input
            type="submit"
            className="modal__button"
            value="Update Product"
          />
          <button onClick={onClose} className="modal__button">
            Close
          </button>
        </form>
        <Alert />
      </div>
    </div>
  );
};

ModelUpdateProduct.propTypes = {
  token: PropTypes.string,
  updateProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, { updateProduct })(ModelUpdateProduct);
