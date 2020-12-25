import React, { useState } from "react";
import { connect } from "react-redux";
import Checkoutproduct from "./Checkoutproduct";
import PropTypes from "prop-types";
import "./styles/checkout.scss";
import { v4 as uuid } from "uuid";
import { updatecheckoutProduct, catchProduct } from "../actions/product";
import { checkoutcart } from "../actions/checkout";
import ModelCheckout from "./ModelCheckout";

const Checkout = ({
  productList,
  checkoutList,
  updatecheckoutProduct,
  token,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const emptyCart = () => {
    checkoutList.map((product) => {
      const index = productList.findIndex((item) => item._id === product.id);
      updatecheckoutProduct(
        product.id,
        product.name,
        product.price,
        productList[index].quantity,
        product.brand,
        product.category,
        token
      );
    });
  };

  var total = 0;
  for (var i = 0; i < checkoutList.length; i++) {
    total =
      total + parseInt(checkoutList[i].price) * parseInt(checkoutList[i].qtn);
  }
  return (
    <div className="checkout">
      <h1 className="checkout__title">Cart total: {total}$</h1>
      <div className="container_override">
        {checkoutList.length === 0 ? (
          <h1 className="checkout__cartempty">Cart Empty</h1>
        ) : (
          checkoutList.map((data) => {
            return (
              <Checkoutproduct
                key={uuid()}
                id={data.id}
                image={data.image}
                name={data.name}
                qtn={data.qtn}
                bb={data.bb}
                price={data.price}
              />
            );
          })
        )}
      </div>
      <ModelCheckout
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
      <button
        className="checkout_button"
        disabled={checkoutList.lenght === 0}
        onClick={() => {
          setIsOpen(true);
          emptyCart();
          checkoutcart();
          catchProduct();
        }}
      >
        CHECKOUT
      </button>
    </div>
  );
};

Checkout.propType = {
  checkoutList: PropTypes.object.isRequired,
  updatecheckoutProduct: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
  productList: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  checkoutList: state.checkout.checkoutList,
  token: state.auth.token,
  productList: state.product.productList,
});

export default connect(mapStateToProps, {
  updatecheckoutProduct,
})(Checkout);
