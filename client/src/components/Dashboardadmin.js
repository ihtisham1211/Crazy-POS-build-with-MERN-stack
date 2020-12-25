import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import Body from "./Body";

export const Dashboardadmin = () => {
  return (
    <div>
      <Header />
      <Body />
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Dashboardadmin);
