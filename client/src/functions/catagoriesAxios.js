import axios from "axios";

const getSpecificCategory = async (slug) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_API}/category/${slug}`,
  });
  return result;
};

const createCategory = async (token, category) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_API}/category`,
    headers: {
      authorization: "Bearer " + token,
    },
    data: { category: category },
  });
  return result;
};

const deleteCategory = async (token, slug) => {
  const result = await axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_BACKEND_API}/category/${slug}`,
    headers: {
      authorization: "Bearer " + token,
    },
  });
  return result;
};
const updateCategory = async (token, category, slug) => {
  const result = await axios({
    method: "PUT",
    url: `${process.env.REACT_APP_BACKEND_API}/category/${slug}`,
    headers: {
      authorization: "Bearer " + token,
    },
    data: { category },
  });
  return result;
};
const getAllCategories = async () => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_API}/categories`,
  });
  return result;
};

const subFromCateg = async (uniqueId) => {
  const result = axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_API}/category/subcategories/${uniqueId}`,
  });
  return result;
};

export {
  getAllCategories,
  getSpecificCategory,
  deleteCategory,
  createCategory,
  updateCategory,
  subFromCateg,
};
