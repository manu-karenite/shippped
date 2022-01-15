//importing the technical items
import React, { useEffect, useState } from "react";
//import complete

//importing the individual components from the component tree
//1) Sidebar
import AdminSidebar from "../../../components/Navigation/AdminSidebar.js";
//2)Create Catgeory Form
import CategoryCreate from "./CategoryCreate.js";
//3) List All categories
import CategoryList from "./CategoryList.js";
//import complete

function Category() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-1">
          <AdminSidebar />
        </div>
        <div className="col-md-11">
          <div className="offset-md-1 mt-4">
            <h4>Create Category</h4>
            <hr />
            <CategoryCreate />
          </div>

          <div className="offset-md-1 mt-5">
            <h4>All Categories</h4>
            <hr />
            <CategoryList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;
