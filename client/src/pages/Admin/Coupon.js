import React, { useState, useEffect } from "react";
import DatePicker from "react-date-picker";
import { useSelector } from "react-redux";

import AdminSidebar from "../../components/Navigation/AdminSidebar.js";
import Loader from "../../components/Utilities/Loader.js";
import { createCoupon, listCoupons } from "../../functions/couponAxios.js";
import CouponCard from "../../components/Cards/CouponCard.js";
import { toast } from "react-toastify";
function Coupon() {
  const { user } = useSelector((state) => ({ ...state }));
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("");
  const [disc, setDisc] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [coupons, setCoupons] = useState([]);

  //for listing coupons
  useEffect(() => {
    getCoupons();
  }, []);

  const getCoupons = () => {
    listCoupons(user.token)
      .then((res) => setCoupons(res.data))
      .catch((err) => toast.error(err));
  };
  //for creating coupon
  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    //create an Object for Coupon Create
    const serviceObject = {
      name: name,
      expiry: date,
      discount: disc,
    };
    createCoupon(user.token, serviceObject)
      .then((res) => {
        toast.success("Coupon Created Succesfully");
        setLoading(false);
        getCoupons();
        setName("");
        setDisc("");
        setDate(new Date());
      })
      .catch((err) => {
        toast.error("Coupon Creation Failed!");
        setLoading(false);
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-1">
          <AdminSidebar />
        </div>
        <div className="col-md-11">
          <h4 className="pt-3 pb-3 text-success">Create Coupon</h4>
          <hr />
          {loading && <Loader />}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="couponName" className="form-label">
                Coupon Name
              </label>
              <input
                type="text"
                className="form-control"
                id="couponName"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="couponDiscount" className="form-label">
                Discount Percentage %
              </label>
              <input
                type="Number"
                className="form-control"
                id="couponDiscount"
                onChange={(e) => setDisc(e.target.value)}
                value={disc}
                max={100}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="couponExpiry" className="form-label">
                Expiry Date (MM /DD / YYYY)
              </label>
              <hr />
              <DatePicker value={date} onChange={(value) => setDate(value)} />
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-success mt-3"
              disabled={name.length < 6 || disc === 0}
            >
              Create Coupon
            </button>
          </form>

          <hr />
          <h4 style={{ color: "purple" }} className="pb-3 ">
            Coupons List
          </h4>
          <hr />
          {deleting && <Loader />}
          <table class="table table-bordered table-dark">
            <thead>
              <tr>
                <th className="text-center" scope="col">
                  #
                </th>
                <th className="text-center" scope="col">
                  Unique Id
                </th>
                <th className="text-center" scope="col">
                  Name
                </th>
                <th className="text-center" scope="col">
                  Discount %
                </th>
                <th className="text-center" scope="col">
                  Expiry Date
                </th>
                <th className="text-center" scope="col">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {coupons &&
                coupons.length > 0 &&
                coupons.map((curr, index) => {
                  return (
                    <CouponCard
                      data={curr}
                      key={index}
                      index={index}
                      getCoupons={getCoupons}
                      setDeleting={setDeleting}
                    />
                  );
                })}{" "}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Coupon;
