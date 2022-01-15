import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getCart, deleteCart } from "../../functions/axios.js";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";

import { saveAddress } from "../../functions/axios.js";
import CouponApply from "../../components/Coupons/CouponApply.js";
import "react-quill/dist/quill.snow.css";
import { createOrder } from "../../functions/orderAxios.js";
function Checkout() {
  const navigate = useNavigate();
  const [prods, setProds] = useState({});
  const [count, setCount] = useState(0);
  const [address, setAddress] = useState("");
  const [isAddressSaved, setIsAddressSaved] = useState(false);
  const [savings, setSavings] = useState(0);
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  useEffect(() => {
    getItems();
  }, [count]);
  const getItems = () => {
    getCart(user.token)
      .then((res) => {
        setProds(res.data);
        setCount(res.data.products.length);
      })
      .catch((err) => toast.error(err));
  };
  const clearCart = () => {
    //first clear the cart
    const cart = [];
    if (window) {
      //clear the local storage for cart
      window.localStorage.setItem("cart", cart);
      //now fire Redux for global update
      dispatch({ type: "ADD_TO_CART", payload: [] });
      //also update the state of the count
      deleteCart(user.token)
        .then((res) => {
          toast.success("Cart is Empty! Shop Now");
          getItems();
          setSavings(0);
        })
        .catch((err) => toast.error(err));
    }
  };
  const handleAddress = () => {
    //address is in the address state
    saveAddress(user.token, address)
      .then((res) => {
        toast.success("Address Saved!Please Place your Order");
        setIsAddressSaved(true);
      })
      .catch((err) => toast.error(err));
  };
  const createMyOrder = (e) => {
    //create an Object for the backend to process an order
    //just send the prods back to backend
    createOrder(user.token, prods)
      .then((res) => {
        //once the order is successfully placed :
        //1) clear the cart  first
        if (window !== "undefined") {
          window.localStorage.setItem("cart", []);
          //dispatch the redux state
          dispatch({ type: "ADD_TO_CART", payload: [] });
          //also delete the cart from backend
          deleteCart(user.token)
            .then((res) => {
              toast.success("ITEM DELETED");
            })
            .catch((err) => toast.error(err));
        }
        //navigate to the page.
        navigate("/user/history");
      })
      .catch((err) => toast.error(err));
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6">
          <h4 className="text-center text-danger pt-3">Address</h4>
          <hr />
          <h6 className="pb-3">Enter the Shipping Address</h6>
          <ReactQuill theme="snow" value={address} onChange={setAddress} />
          <hr />

          <button
            className="btn btn-success mb-3"
            disabled={address === "" || address.length < 6}
            onClick={handleAddress}
          >
            Save Address
          </button>
          <hr />
          <CouponApply
            getItems={getItems}
            prods={prods}
            setSavings={setSavings}
          />
        </div>
        <div className="col-md-6">
          <h4 className="text-center text-success pt-3">Order Summary</h4>
          <hr />
          <h5>Bill Amount: ₹{prods ? prods.cartTotal : "0"}</h5>
          <hr />
          <h5 className="text-warning">Items</h5>
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Color</th>
                <th scope="col">Quantity</th>
                <th scope="col">Rate</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {prods &&
                prods.products &&
                prods.products.map((curr, index) => {
                  return (
                    <tr className="" key={index}>
                      <td>{curr.product}</td>
                      <td style={{ color: `${curr.color}` }}>{curr.color}</td>
                      <td>{curr.count}</td>
                      <td>₹{curr.price}</td>
                      <td>₹{curr.price * curr.count}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <h6>Your Savings : ₹ {savings} </h6>
          <hr />
          <h5>
            Discounted Amount : ₹
            {prods && prods.discountedPrice ? prods.discountedPrice : "0"}{" "}
          </h5>
          <hr />
          <div className="row pt-1">
            <div className="col-md-6">
              <center>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </center>
            </div>
            <div className="col-md-6">
              <center>
                <button
                  type="button"
                  className="btn btn-success"
                  disabled={!prods || isAddressSaved === false}
                  onClick={createMyOrder}
                >
                  Place Order
                </button>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
