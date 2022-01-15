import React from "react";

import AdminSidebar from "../../../components/Navigation/AdminSidebar.js";
import ProductForm from "./ProductForm.js";
export default function Product() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-1">
          <AdminSidebar />
        </div>
        <div className="col-md-11">
          <div className="offset-md-1 mt-3">
            <h4>Create Product</h4>
            <hr />
            <ProductForm />
          </div>
        </div>
      </div>
    </div>
  );
}
