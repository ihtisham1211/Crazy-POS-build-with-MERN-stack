import React, { useRef } from "react";
import { connect } from "react-redux";
import "./styles/ModelCheckout.scss";
import PropTypes from "prop-types";
import { catchProduct } from "../actions/product";
import { checkoutcart } from "../actions/checkout";
import { v4 as uuid } from "uuid";
import ReactToPrint from "react-to-print";

const ModelCheckout = ({
  open,
  onClose,
  checkoutList,
  catchProduct,
  checkoutcart,
}) => {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
      catchProduct();
      checkoutcart();
    }
  };

  var total = 0;
  for (var i = 0; i < checkoutList.length; i++) {
    total =
      total + parseInt(checkoutList[i].price) * parseInt(checkoutList[i].qtn);
  }

  if (!open) return null;
  return (
    <div className="c_Overlay" ref={modalRef} onClick={closeModal}>
      <div className="c_ModelCreateProduct">
        <h1 className="c_title">Crazy POS</h1>
        <p className="c_p">-----------------------</p>
        <h4>
          <u>ITEMS:</u>
        </h4>

        {checkoutList.length === 0
          ? "No item found"
          : checkoutList.map((product) => (
              <div className="c_list" key={uuid()}>
                <h4>{product.name}</h4>
                <h4 className="c_price">
                  {" "}
                  {product.qtn} x {product.price} $
                </h4>
              </div>
            ))}
        <p className="c_p">-----------------------</p>
        <div className="c_l">
          <h4>Date: {new Date().toJSON().slice(0, 10).replace(/-/g, "/")}</h4>
          <h4 className="c_total">
            <u>Total: </u> {total}$
          </h4>
        </div>
        <h5 className="c_created">Bill created by Crazy POS</h5>
        <ReactToPrint
          trigger={() => <button className="c_btn">Print</button>}
          content={() => modalRef.current}
        />
      </div>
    </div>
  );
};

ModelCheckout.propTypes = {
  checkoutcart: PropTypes.func.isRequired,
  catchProduct: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  checkoutList: state.checkout.checkoutList,
});

export default connect(mapStateToProps, { checkoutcart, catchProduct })(
  ModelCheckout
);
