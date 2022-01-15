import React, { useState, useEffect } from "react";
import { Select } from "antd";
import { useSelector } from "react-redux";

import { modifyStatus } from "../../functions/orderAxios.js";
import { toast } from "react-toastify";
const { Option } = Select;
function PurchaseCard({ el, status, setStatus, getOrders }) {
  const { user } = useSelector((state) => ({ ...state }));
  const changeStatusHandler = (value) => {
    setStatus(value);
    //get the value and update the DB.......
    modifyStatus(user.token, el._id, value)
      .then((res) => {
        getOrders();
        toast.success("The Order Status has been Updated Succesfully");
      })
      .catch((err) => toast.error(err));
  };
  return (
    <div className="me-3 ms-2 mb-5 border">
      <div className="row border-bottom border-5  p-2 ">
        <div className="col-md-4 text-center ">
          Purchased At :
          {new Intl.DateTimeFormat("en-IN", {
            month: "long",
            day: "numeric",
            year: "numeric",
            weekday: "short",
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(el.dateOfOrder))}
        </div>
        <div
          className="col-md-4  text-center"
          style={{ color: "green", fontWeight: "bolder", fontSize: "20px" }}
        >
          {el.status}
        </div>
        <div className="col-md-4 text-center">
          <pre>Order Id: {el.serviceId}</pre>
        </div>
      </div>
      {el.products.map((curr, index) => {
        return (
          <div key={index} className="row border  p-2">
            <div className="col-md-4 text-center">
              {curr.product.title.toUpperCase()} ({curr.color})
            </div>
            <div className="col-md-4 text-center">{curr.count} Pc.</div>
            <div className="col-md-4 text-center">
              ₹ {curr.product.price} x {curr.count} = ₹
              {curr.product.price * curr.count}
            </div>
          </div>
        );
      })}
      <div className="row border-top border-5  p-2">
        <div className="col-md-4  text-center ">
          <pre>
            Buyer : {el.orderedBy._id}
            <br />
            UserId: {el.orderedBy.name}
          </pre>
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-4  text-center  ">
          Net Amount Paid : ₹{el.discountedAmount}
        </div>
      </div>

      <div className="row">
        <div className="col-md-2"></div>

        <div className="col-md-8 text-center mb-2">
          <div className="text-center">
            <label htmlFor="changeStatus" className="form-label text-success">
              Change Order Status
            </label>
            <hr />
            <Select
              value={el.status}
              style={{ width: 120 }}
              onChange={changeStatusHandler}
            >
              <Option value="Initiated">Initiated</Option>
              <Option value="Processed">Processed</Option>
              <Option value="Shipped">Shipped</Option>
              <Option value="Out For Delivery">Out For Delivery</Option>
              <Option value="Delivered">Delivered</Option>
              <Option value="Cancelled">Cancelled</Option>
            </Select>
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
  );
}

export default PurchaseCard;
