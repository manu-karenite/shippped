import axios from "axios";

const createOrder = async (token, prods) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_API}/order`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: prods,
  });
  return result;
};
const getOrders = async (token) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_API}/orders`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return result;
};

const getAdminOrders = async (token) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_API}/admin/orders`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return result;
};
const modifyStatus = async (token, orderId, status) => {
  const result = await axios({
    method: "PUT",
    url: `${process.env.REACT_APP_BACKEND_API}/admin/orders`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: { orderId, status },
  });
  return result;
};
export { createOrder, getOrders, getAdminOrders, modifyStatus };
