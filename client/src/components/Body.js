import React from "react";
import { connect } from "react-redux";
import Checkout from "./Checkout";
import Productslist from "./Productslist";
import "./styles/body.scss";
const Body = () => {
  return (
    <div className="bodyc">
      <Productslist />
      <Checkout />
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Body);
