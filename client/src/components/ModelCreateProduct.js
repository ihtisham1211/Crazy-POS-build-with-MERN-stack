import PropTypes from "prop-types";
import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import Alert from "./Alert";
import { addProduct } from "../actions/product";
import "./styles/modelCreateProduct.scss";

const ModelCreateProduct = ({ open, onClose, token, addProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    brand: "",
    category: "",
  });
  const [image, setImage] = useState({
    image: "",
  });

  const { name, price, quantity, brand, category } = formData;
  // data setter
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: [e.target.value] });
  };

  const onChangeFile = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage({ ...image, image: reader.result });
    };
  };

  //on submit
  const onSubmit = (e) => {
    e.preventDefault();
    addProduct(
      name.toString(),
      price.toString(),
      quantity.toString(),
      brand.toString(),
      category.toString(),
      image.image,
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
            value={name}
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
            value={price}
            onChange={(e) => onChange(e)}
            required
          ></input>
          <input
            className="modal_tfield"
            placeholder="Quantity"
            type="number"
            name="quantity"
            value={quantity}
            onChange={(e) => onChange(e)}
            required
          ></input>

          <input
            className="modal_tfield"
            placeholder="Brand"
            type="text"
            name="brand"
            value={brand}
            onChange={(e) => onChange(e)}
          ></input>
          <input
            className="modal_tfield"
            placeholder="Category"
            type="text"
            name="category"
            value={category}
            onChange={(e) => onChange(e)}
            required
          ></input>

          <input
            className="modal_btn"
            type="file"
            name="image"
            onChange={(e) => onChangeFile(e.target.files[0])}
            required
          ></input>

          <input
            type="submit"
            className="modal__button"
            value="Create Product"
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
ModelCreateProduct.propTypes = {
  token: PropTypes.string,
  addProduct: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, { addProduct })(ModelCreateProduct);
