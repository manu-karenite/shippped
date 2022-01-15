import React from "react";
function PurchaseCard({ el }) {
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
        <div className="col-md-4 text-center">Order Id: {el.serviceId}</div>
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
          {-el.discountedAmount + el.totalAmount > 0
            ? "COUPON APPLIED"
            : "no coupon applied"}
        </div>
        <div className="col-md-4"></div>
        <div className="col-md-4  text-center  ">
          Net Amount Paid : ₹{el.discountedAmount}
        </div>
      </div>
    </div>
  );
}

export default PurchaseCard;
