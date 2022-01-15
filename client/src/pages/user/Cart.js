//from React-related imports
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

//for User Imports
import ProductCheckoutCard from "../../components/Cards/ProductCheckoutCard.js";

import { sendCart } from "../../functions/axios.js";
function Cart() {
  //for programmatic Navigation
  const location = useLocation();
  const navigate = useNavigate();
  const progNavigate = () => {
    navigate("/login", { replace: true, state: { cart: location } });
  };
  //programmatic navigation complete

  const { user, cart } = useSelector((state) => ({ ...state }));

  const getTotal = () => {
    return cart.reduce((prev, curr) => prev + curr.count * curr.price, 0);
  };
  const saveOrderDB = () => {
    sendCart(user.token, cart)
      .then((res) => {
        navigate("/checkout");
      })
      .catch((err) => toast.error(err));
  };
  const showCartItems = () => {
    return (
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Title</th>
            <th scope="col">Price</th>
            <th scope="col">Brand</th>
            <th scope="col">Color</th>
            <th scope="col">Count</th>
            <th scope="col">Shipping</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        {cart.map((p, index) => (
          <ProductCheckoutCard key={index} p={p} />
        ))}
      </table>
    );
  };
  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-8">
          <h4>Cart/ {cart.length} Product</h4>
          {cart.length > 0 ? (
            <h6>{showCartItems()}</h6>
          ) : (
            <h6>
              No Items in the Cart..! <Link to="/home">Continue Shopping</Link>
            </h6>
          )}
        </div>

        <div className="col-md-4">
          <h3 className="text-center text-success pt-2">Order Summary</h3>{" "}
          <hr />
          <p className="h4 text-center">--- Products ---</p>
          {cart.map((c, i) => {
            return (
              <div key={i}>
                <p>
                  {i + 1}) {c.title} * {c.count} = ₹{c.price * c.count}
                </p>
              </div>
            );
          })}
          <hr />
          Total : <span>₹{getTotal()}</span>
          <hr />
          {user && user.token ? (
            <center>
              <button
                className="btn btn-sm btn-primary mt-2"
                onClick={saveOrderDB}
                disabled={cart.length === 0}
              >
                Proceed to Checkout
              </button>
            </center>
          ) : (
            <center>
              <button
                className="btn btn-sm btn-primary mt-2"
                onClick={progNavigate}
                disabled={cart.length === 0}
              >
                Login to Checkout
              </button>
            </center>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
