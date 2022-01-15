import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import SidebarUser from "../../components/Navigation/SidebarUser.js";
import { list, del } from "../../functions/wishlistAxios.js";

import { toast } from "react-toastify";

function Wishlist() {
  const { user } = useSelector((state) => ({ ...state }));
  const [prods, setProds] = useState([]);

  useEffect(() => {
    getItems();
  }, []);
  const getItems = () => {
    list(user.token)
      .then((res) => setProds(res.data))
      .catch((err) => toast.error(err));
  };

  const removeWishlist = (id) => {
    //delete this product id................
    del(user.token, id)
      .then((res) => getItems())
      .catch((err) => toast.error(err));
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <SidebarUser />
        </div>
        <div className="col-md-9">
          <h4 className="text-center mt-3 mb-3 text-success">Your Wishlist</h4>
          <hr />

          {prods && prods.length === 0 ? (
            <>
              <h4 className="text-center text-danger">
                No Products in Your Wishlist
              </h4>
              <br />
              <hr />
              <center>
                <Link to="/home">Shop Here</Link>
              </center>
            </>
          ) : (
            prods.map((curr, index) => {
              return (
                <div className="card text-center mb-4" key={index}>
                  <div
                    className="card-header"
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    {curr.brand.toUpperCase()} ({curr.color.toLowerCase()})
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{curr.title}</h5>
                    <p className="card-text">{curr.description}. </p>
                    <Link to={`/product/${curr.slug}`}>
                      <button className="btn btn-primary">View Product</button>
                    </Link>
                    <button
                      className="btn btn-danger ms-3"
                      onClick={() => removeWishlist(curr._id)}
                    >
                      Remove from Wishlist
                    </button>
                  </div>
                  <div
                    className="card-footer"
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    Price: ₹{curr.price}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
