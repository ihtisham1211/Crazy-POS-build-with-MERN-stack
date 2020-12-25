import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import Product from "./Product";
import { GrSearch } from "react-icons/gr";
import PropTypes from "prop-types";
import { catchProduct } from "../actions/product";
import "./styles/productlist.scss";
import { v4 as uuid } from "uuid";

const Productslist = ({ catchProduct }) => {
  useEffect(() => {
    catchProduct();
  }, []);
  const productList = useSelector((state) => state.product.productList);
  const [search, setSearch] = useState("");

  return (
    <div className="productslist">
      <div className="s_constain">
        <input
          className="product_textfd"
          placeholder="Search Product"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        ></input>

        <button className="search">
          <GrSearch />
        </button>
      </div>

      <div className="container">
        {productList.length === 0 ? (
          <div className="lds-dual-ring"></div>
        ) : (
          [
            search === ""
              ? productList.map((data) => {
                  return (
                    <Product
                      key={uuid()}
                      id={data._id}
                      image={data.productimg}
                      name={data.name}
                      qtn={data.quantity}
                      bb={data.date.split("T")[0]}
                      price={data.price}
                      category={data.category}
                      brand={data.brand}
                    />
                  );
                })
              : productList.map((data) => {
                  if (data.name.includes(search)) {
                    return (
                      <Product
                        key={uuid()}
                        id={data._id}
                        image={data.productimg}
                        name={data.name}
                        qtn={data.quantity}
                        bb={data.date.split("T")[0]}
                        price={data.price}
                        category={data.category}
                        brand={data.brand}
                      />
                    );
                  }
                }),
          ]
        )}
      </div>
    </div>
  );
};
Productslist.propTypes = {
  catchProduct: PropTypes.func.isRequired,
  productList: PropTypes.array,
};

const mapStateToProps = (state) => ({
  productList: state.product.productList,
});

export default connect(mapStateToProps, { catchProduct })(Productslist);
