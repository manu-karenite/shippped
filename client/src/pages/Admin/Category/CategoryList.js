//importing React components
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
//importing Misc Components
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import {
  getAllCategories,
  deleteCategory,
} from "../../../functions/catagoriesAxios.js";
import SearchBar from "../../../components/Utilities/SearchBar.js";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const [key, setKey] = useState("");
  let token = user.token;
  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = () => {
    getAllCategories()
      .then((res) => {
        setCategories(res.data.data.categories);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const deleteCategoryHandler = async (slug) => {
    try {
      const result = await deleteCategory(token, slug);
      toast.success("Item Deleted Succesully");
      loadCategories();
    } catch (error) {
      toast.error("Item Deletion Failed. Check the Category");
      toast.error(error);
    }
  };

  return (
    <div>
      <div>
        <h5>Total Contents : {categories.length}</h5>
        <div className="float-end mb-2">
          <SearchBar keyy={key} setKey={setKey} />
        </div>
      </div>
      <table className="table table-striped table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Category</th>
            <th scope="col">Slug</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories
            .filter(function (el) {
              return el.name.toLowerCase().includes(key);
            })
            .map((curr, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{curr.name}</td>
                  <td>{curr.slug}</td>
                  <td>
                    <Link to={`/admin/category/${curr.slug}`}>
                      <EditOutlined />
                    </Link>
                  </td>
                  <td>
                    <DeleteOutlined
                      onClick={() => deleteCategoryHandler(curr.slug)}
                    />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryList;
