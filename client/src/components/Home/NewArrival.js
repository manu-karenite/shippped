import React, { useEffect, useState } from "react";
import { Pagination, Skeleton } from "antd";
//importing custom components from
import Jumbotron from "../../components/Cards/Jumbotron.js";
import { toast } from "react-toastify";
import {
  listProducts,
  fetchProducts,
  getCount,
} from "../../functions/productAxios.js";
import ProductCard from "../../components/Cards/ProductCard.js";
function NewArrival() {
  const [products, setProducts] = useState([]);
  const [count, setCount] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getProduct();
  }, [page]);
  const getProduct = () => {
    setLoading(true);
    fetchProducts("createdAt", "desc", page)
      .then((res) => {
        setProducts(res.data.result);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  useEffect(() => {
    countProducts();
  }, []);
  const countProducts = () => {
    getCount()
      .then((res) => {
        setCount(res.data.quantity);
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  return (
    <>
      <h5 className="jumbotron display-6 p-3 mt-5 mb-5 text-center">
        New Arrivals
      </h5>
      {loading && (
        <div className="container-fluid mb-4 mt-4">
          <div className="row align-items-start">
            <div className="col-md-4">
              <Skeleton active={true} />
            </div>
            <div className="col-md-4">
              <Skeleton active={true} />
            </div>
            <div className="col-md-4">
              <Skeleton active={true} />
            </div>
          </div>
        </div>
      )}
      {loading === false && (
        <div className="container mb-4 mt-4">
          <div className="row align-items-start">
            {products.map((traits) => {
              return (
                <div className="col-4" key={products._id}>
                  <ProductCard traits={traits} key={traits._id} />
                </div>
              );
            })}
          </div>
        </div>
      )}
      <Pagination
        defaultCurrent={1}
        current={page}
        total={count * 3}
        onChange={(page) => setPage(page)}
        className="text-center pb-3"
      />
    </>
  );
}

export default NewArrival;
