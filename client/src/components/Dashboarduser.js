import React from "react";
import { connect } from "react-redux";
import Body from "./Body";
import Header from "./Header";

const Dashboarduser = ({}) => {
  return (
    <div>
      <Header />
      <Body />
    </div>
  );
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(Dashboarduser);
