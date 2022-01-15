import axios from "axios";

const add = async (token, productId) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_API}/user/wishlist`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: { productId },
  });
  return result;
};
const list = async (token) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_API}/user/wishlisted`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return result;
};

const del = async (token, productId) => {
  const result = await axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_BACKEND_API}/user/wishlist`,
    headers: {
      authorization: `Bearer ${token}`,
    },
    data: { productId },
  });
  return result;
};

export { add, list, del };
