import axios from "axios";
const sendDetails = async (token) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_API}/create-or-update-user`,
    headers: {
      authorization: "Bearer " + token,
    },
  });
  return result;
};

const currentUser = async (token) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_API}/current-user`,
    headers: {
      authorization: "Bearer " + token,
    },
  });
  return result;
};

const currentAdmin = async (token) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_API}/current-admin`,
    headers: {
      authorization: "Bearer " + token,
    },
  });
  return result;
};

const sendCart = async (token, cart) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_API}/user/cart`,
    headers: {
      authorization: "Bearer " + token,
    },
    data: cart,
  });
  return result;
};
const getCart = async (token) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_API}/user/checkout`,
    headers: {
      authorization: "Bearer " + token,
    },
  });
  return result;
};
const deleteCart = async (token) => {
  const result = await axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_BACKEND_API}/user/cart`,
    headers: {
      authorization: "Bearer " + token,
    },
  });
  return result;
};
const saveAddress = async (token, address) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_API}/user/save-address`,
    headers: {
      authorization: "Bearer " + token,
    },
    data: { address },
  });
  return result;
};

export {
  sendDetails,
  currentUser,
  currentAdmin,
  getCart,
  sendCart,
  deleteCart,
  saveAddress,
};
