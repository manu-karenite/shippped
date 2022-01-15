import axios from "axios";

const getSpecificSubCategory = async (slug) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_API}/subcategory/${slug}`,
  });
  return result;
};

const createSubCategory = async (token, subcategory) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_API}/subcategory`,
    headers: {
      authorization: "Bearer " + token,
    },
    data: subcategory,
  });
  return result;
};

const deleteCategory = async (token, slug) => {
  const result = await axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_BACKEND_API}/subcategory/${slug}`,
    headers: {
      authorization: "Bearer " + token,
    },
  });
  return result;
};
const updateSubCategory = async (token, subcategory, slug) => {
  const result = await axios({
    method: "PUT",
    url: `${process.env.REACT_APP_BACKEND_API}/subcategory/${slug}`,
    headers: {
      authorization: "Bearer " + token,
    },
    data: { subcategory },
  });
  return result;
};
const getAllSubCategories = async () => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_API}/subcategories`,
  });
  return result;
};

export {
  getAllSubCategories,
  createSubCategory,
  deleteCategory,
  updateSubCategory,
  getSpecificSubCategory,
};
