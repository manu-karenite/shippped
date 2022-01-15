import axios from "axios";
const createProduct = async (token, details) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_API}/product`,
    headers: {
      authorization: "Bearer " + token,
    },
    data: details,
  });
  return result;
};

const listProducts = async (count) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_API}/products/${count}`,
  });
  return result;
};

const deleteOne = async (token, slug) => {
  const result = await axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_BACKEND_API}/product/${slug}`,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return result;
};

const getOne = async (slug) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_API}/product/${slug}`,
  });
  return result;
};

const fetchProducts = async (sort, order, page) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_API}/products`,
    data: {
      sort: sort,
      order: order,
      page: page,
    },
  });
  return result;
};

const getCount = async () => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_API}/products-total`,
  });
  return result;
};

const setStars = async (star, id, token) => {
  const result = await axios({
    method: "PUT",
    url: `${process.env.REACT_APP_BACKEND_API}/product/star/${id}`,
    data: { star },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return result;
};

const prodsFromSubs = async (slug) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_API}/productS/categories/${slug}`,
    data: { slug },
  });
  return result;
};
const prodsFromSubcategories = async (slug) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_API}/products/subcategories/${slug}`,
    data: { slug },
  });
  return result;
};
export {
  createProduct,
  listProducts,
  deleteOne,
  getOne,
  fetchProducts,
  getCount,
  setStars,
  prodsFromSubs,
  prodsFromSubcategories,
};
