import axios from "axios";

const createCoupon = async (token, serviceObject) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_API}/coupon/create`,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: serviceObject,
  });
  return result;
};
const listCoupons = async (token) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_API}/coupons/list`,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return result;
};
const removeCoupon = async (token, id) => {
  const result = await axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_BACKEND_API}/coupon/remove/${id}`,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  return result;
};

const checkCoupon = async (token, couponName) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_API}/coupon/check`,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: {
      couponName: couponName,
    },
  });
  return result;
};
export { createCoupon, listCoupons, removeCoupon, checkCoupon };
