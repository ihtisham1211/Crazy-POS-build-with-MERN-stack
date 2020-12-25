import React from "react";
import { connect, useDispatch } from "react-redux";
import { TiMinus } from "react-icons/ti";
import "./styles/checkoutproduct.scss";
import PropTypes from "prop-types";
import { deletefromCart } from "../actions/checkout";
import { INCREASE_PRODUCT } from "../actions/types";

const Checkoutproduct = ({
  id,
  image,
  name,
  qtn,
  bb,
  price,
  deletefromCart,
}) => {
  const dispatch = useDispatch();
  return (
    <div className="checkoutproduct">
      <img alt="Nothing Found" src={image}></img>
      <div className="product_tags">
        <h3>{name}</h3>
        <h5>
          <b>Qtn: </b>
          {qtn}
        </h5>
        <h5>
          <b>BB: </b>
          {bb}
        </h5>
        <h5>
          <b>Price: </b>
          {price}$
        </h5>
        <button
          className="min_button"
          onClick={(e) => {
            deletefromCart(id);
            dispatch({ type: INCREASE_PRODUCT, payload: id });
          }}
        >
          <TiMinus />
        </button>
      </div>
    </div>
  );
};
Checkoutproduct.propTypes = {
  deletefromCart: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { deletefromCart })(Checkoutproduct);
