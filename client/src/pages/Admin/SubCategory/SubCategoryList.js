//importing React components
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
//importing Misc Components
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import SearchBar from "../../../components/Utilities/SearchBar.js";
import {
  getAllSubCategories,
  deleteCategory,
} from "../../../functions/subcategoriesAxios.js";

const CategoryList = () => {
  const [subcategories, setSubcategories] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const [key, setKey] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);
  const loadCategories = () => {
    getAllSubCategories()
      .then((res) => {
        setSubcategories(res.data.data.subcategory);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const deleteSub = async (slug) => {
    try {
      const result = await deleteCategory(user.token, slug);
      toast.success("Item Deleted Succesully");
      loadCategories();
    } catch (error) {
      toast.error("Item Deletion Failed. Check the SubCategory");
    }
  };
  return (
    <div>
      <div>
        <h5>Total Contents : {subcategories.length}</h5>
        <div className="float-end mb-2">
          <SearchBar keyy={key} setKey={setKey} />
        </div>
      </div>
      <table className="table table-striped table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">SubCategory</th>
            <th scope="col">Slug</th>
            <th scope="col">Parent Category</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {subcategories
            .filter(function (el) {
              return el.name.toLowerCase().includes(key);
            })
            .map((curr, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{curr.name}</td>
                  <td>{curr.slug}</td>
                  <td>{curr.parent}</td>
                  <td>
                    <Link to={`/admin/subcategory/${curr.slug}`}>
                      <EditOutlined />
                    </Link>
                  </td>
                  <td>
                    <DeleteOutlined onClick={() => deleteSub(curr.slug)} />
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
