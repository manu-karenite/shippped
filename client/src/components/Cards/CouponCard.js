import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { DeleteOutlined } from "@ant-design/icons";
import Loader from "../Utilities/Loader.js";

import { removeCoupon } from "../../functions/couponAxios.js"; //takes token and id
function CouponCard({ data, index, getCoupons, setDeleting }) {
  const { user } = useSelector((state) => ({ ...state }));
  const deleteCouponHandler = () => {
    setDeleting(true);
    removeCoupon(user.token, data._id)
      .then((res) => {
        getCoupons();
        setDeleting(false);
      })
      .catch((err) => {
        toast.error(err);
        setDeleting(false);
      });
  };
  return (
    <tr>
      <th className="text-center" scope="row">
        {index + 1}
      </th>
      <td className="text-center">{data._id}</td>
      <td className="text-center">{data.name}</td>
      <td className="text-center">{data.discount}%</td>
      <td className="text-center">
        {new Intl.DateTimeFormat("en-IN", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date(data.expiry))}
      </td>
      <td className="text-center">
        <DeleteOutlined onClick={deleteCouponHandler} />
      </td>
    </tr>
  );
}

export default CouponCard;
