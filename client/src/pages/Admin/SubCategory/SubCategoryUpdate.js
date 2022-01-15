import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

//importing Custom components
import AdminSidebar from "../../../components/Navigation/AdminSidebar.js";
import {
  getSpecificSubCategory,
  updateSubCategory,
} from "../../../functions/subcategoriesAxios.js";
function SubCategoryUpdate() {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const [update, setUpdate] = useState("");
  const { slug } = useParams();

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = () => {
    getSpecificSubCategory(slug)
      .then((res) => {
        if (res.data.length < 1) {
          toast.warning("No Such SubCategory Found. Redirecting Back..");
          navigate("/admin/subcategory");
        }
        //otherwise
        setUpdate(res.data.data.name);
      })

      .catch((err) => {
        toast.error("Unexpected Error Occured. Please Try Again");
      });
  };

  const handleSubmit = async (e) => {
    //handle submit handler
    e.preventDefault();

    try {
      const result = await updateSubCategory(user.token, update, slug);
      toast.success("SubCategory Updated Succesfully");
      navigate("/admin/subcategory");
    } catch (error) {
      toast.error(error.message);
      navigate("/admin/subcategory");
    }
  };
  const updateCategoryForm = () => {
    return (
      <div className="me-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            autoFocus
            placeholder="Category Name Here (minimum 2 chars)"
            value={update}
            onChange={(e) => setUpdate(e.target.value)}
          />

          <button type="submit" className="btn btn-success mt-3">
            Update Category
          </button>
        </form>
      </div>
    );
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-1">
          <AdminSidebar />
        </div>
        <div className="col-md-11">
          <div className="offset-md-1 mt-4">
            <h4>Update Category</h4>
            <hr />
            {updateCategoryForm()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubCategoryUpdate;
