import React from "react";
import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <ul className="nav flex-column text-align-justify">
      <li className="nav-item pt-1 pb-1">
        <Link to="/admin/dashboard">Dashboard</Link>
      </li>
      <li className="nav-item  pt-1 pb-1">
        <Link to="/admin/product">Product</Link>
      </li>
      <li className="nav-item  pt-1 pb-1">
        <Link to="/admin/products">Products</Link>
      </li>
      <li className="nav-item  pt-1 pb-1">
        <Link to="/admin/category">Category</Link>
      </li>
      <li className="nav-item  pt-1 pb-1">
        <Link to="/admin/subcategory">Sub-Category</Link>
      </li>
      <li className="nav-item  pt-1 pb-1">
        <Link to="/admin/coupon">Coupon</Link>
      </li>
      <li className="nav-item  pt-1 pb-1">
        <Link to="/user/password-update">Password</Link>
      </li>
    </ul>
  );
}

export default AdminSidebar;
