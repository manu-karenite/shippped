//importing the technical items
import React, { useEffect, useState } from "react";
//import complete

//importing the individual components from the component tree
//1) Sidebar
import AdminSidebar from "../../../components/Navigation/AdminSidebar.js";
import SubCategoryCreate from "./SubCategoryCreate.js";
import SubCategoryList from "./SubCategoryList.js";

//importing axios functions
import { getAllSubCategories } from "../../../functions/subcategoriesAxios.js";
import { getAllCategories } from "../../../functions/catagoriesAxios.js";
import { toast } from "react-toastify";

function Category() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    loadAllCategories();
  }, []);
  const loadAllCategories = () => {
    getAllCategories()
      .then((res) => {
        setCategories(res.data.data.categories);
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-1">
          <AdminSidebar />
        </div>
        <div className="col-md-11">
          <div className="offset-md-1 mt-4">
            <h4>Create Sub-Category</h4>
            <hr />
            <SubCategoryCreate
              categories={categories}
              setCategories={setCategories}
            />
          </div>

          <div className="offset-md-1 mt-5">
            <h4>All Categories</h4>
            <hr />
            <SubCategoryList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
