import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { checkCoupon } from "../../functions/couponAxios.js";
function CouponApply({ getItems, prods, setSavings }) {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const [coupon, setCoupon] = useState("");
  const [success, setSuccess] = useState(false);
  const [display, setDisplay] = useState(false);
  const [readonly, setReadonly] = useState(false);
  const submitCouponHandler = (e) => {
    e.preventDefault();
    checkCoupon(user.token, coupon)
      .then((res) => {
        setSuccess(true);
        getItems();
        setReadonly(true);
        setSavings((prods.cartTotal - prods.discountedPrice).toFixed(2));
      })
      .catch((err) => {
        setSuccess(false);
      });
    setDisplay(true);
  };
  const clearCoupon = (e) => {
    e.preventDefault();
    setReadonly(false);
    setDisplay(false);
    setSuccess(false);
    setCoupon("");
  };
  return (
    <div>
      <h4 style={{ color: "ORANGE" }}>Having A Coupon?</h4>
      <hr />
      <form onSubmit={submitCouponHandler}>
        <div className="form-group">
          <label htmlFor="couponCode" className="h6">
            Coupon Code
          </label>
          <input
            type="text"
            className="form-control"
            id="couponCode"
            placeholder="Enter Coupon Code Here"
            onChange={(e) => setCoupon(e.target.value)}
            value={coupon}
            autoComplete="off"
            disabled={readonly}
          />
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          disabled={cart.length === 0}
        >
          Check Coupon
        </button>
        <button type="clear" class="btn btn-danger ml-3" onClick={clearCoupon}>
          Change Coupon
        </button>
      </form>
      {display && (
        <div
          className={
            success ? "text-success  h5 pt-3 pb-3" : "text-danger  h5 pt-3 pb-3"
          }
        >
          {success ? "COUPON APPLIED SUCCESSFULLY ..!" : "COUPON NOT FOUND"}
        </div>
      )}
    </div>
  );
}

export default CouponApply;
