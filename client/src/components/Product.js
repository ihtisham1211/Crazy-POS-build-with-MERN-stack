import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { MdUpdate } from "react-icons/md";
import { TiPlus } from "react-icons/ti";
import PropTypes from "prop-types";
import { deleteProduct } from "../actions/product";
import { addToCart } from "../actions/checkout";
import "./styles/product.scss";
import ModelUpdateProduct from "./ModelUpdateProduct";

import { DECREASE_PRODUCT } from "../actions/types";

const Product = ({
  id,
  image,
  name,
  qtn,
  bb,
  price,
  category,
  brand,
  token,
  deleteProduct,
  addToCart,
}) => {
  const product = {
    id,
    image,
    name,
    qtn: 1,
    bb,
    price,
    brand,
    category,
  };
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="product">
      <img alt="Nothing Found" src={image}></img>
      <div className="product_tags">
        <h3>{name}</h3>
        <h5>
          <b>Qtn: </b>
          {qtn === 0 ? (
            <b>
              <u>Out Of Stock</u>
            </b>
          ) : (
            qtn
          )}
        </h5>
        <h5>
          <b>Date: </b>
          {bb}
        </h5>
        <h5>
          <b>Price: </b>
          {price}$
        </h5>
        <h5>
          <b>Category: </b>
          {category}
        </h5>
        <button
          className="add_button"
          disabled={qtn === 0}
          onClick={() => {
            addToCart(product);
            dispatch({ type: DECREASE_PRODUCT, payload: id });
          }}
        >
          <TiPlus />
        </button>
        <button
          className="update_button"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <MdUpdate />
        </button>

        <ModelUpdateProduct
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          id={id}
          name={name}
          price={price}
          quantity={qtn}
          brand={brand}
          category={category}
        ></ModelUpdateProduct>

        <button
          className="delete_button"
          onClick={(e) => {
            deleteProduct(token, id);
          }}
        >
          <AiFillDelete />
        </button>
      </div>
    </div>
  );
};

Product.propTypes = {
  token: PropTypes.string,
  deleteProduct: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

export default connect(mapStateToProps, { deleteProduct, addToCart })(Product);
