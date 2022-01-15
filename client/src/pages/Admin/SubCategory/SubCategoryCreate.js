import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";

//import  custom components here...
import { createSubCategory } from "../../../functions/subcategoriesAxios.js";

function CategoryCreate({ categories, setCategories }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [catId, setCatId] = useState("");
  const [sub, setSub] = useState("");

  const handleSubmit = async (e) => {
    //handle
    e.preventDefault();
    const toSend = {
      subcategory: sub,
      parent: catId,
    };
    try {
      const result = await createSubCategory(user.token, toSend);
      toast(
        `Category ${result.data.data.createdResult.slug} Created Succesfully`
      );
      setSub("");
      setCatId("");
    } catch (error) {
      toast.error(`SubCategory already exists. Try Again`);
      setSub("");
      setCatId("");
    }
  };
  return (
    <div className="me-5">
      <div className="mb-3">
        <select
          className="form-select"
          aria-label="Default select example"
          onChange={(e) => setCatId(e.target.value)}
        >
          <option value={""}>Select Category</option>
          {categories.map((element) => {
            return (
              <option key={element._id} value={element._id}>
                {element.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="mb-3">Category Id : {catId} </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          autoFocus
          placeholder="SubCategory Name Here (minimum 2 chars)"
          value={sub}
          onChange={(e) => setSub(e.target.value)}
          disabled={catId === ""}
        />

        <button
          type="submit"
          className="btn btn-success mt-3"
          disabled={catId === "" || sub === ""}
        >
          Create Sub-Category
        </button>
      </form>
    </div>
  );
}

export default CategoryCreate;
