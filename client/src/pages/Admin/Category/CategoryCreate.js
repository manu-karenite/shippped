import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { LoadingOutlined } from "@ant-design/icons";

//import  custom components here...
import { createCategory } from "../../../functions/catagoriesAxios.js";

function CategoryCreate() {
  const { user } = useSelector((state) => ({ ...state }));
  const [category, setCategory] = useState("");
  const [ok, setOk] = useState(false);
  //we get the token first from the redux
  const token = user.token;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setOk(true);
    try {
      const result = await createCategory(token, category);
      toast.success(
        `Category ${result.data.data.createdResult.slug} Created Succesfully ✅`
      );
      setOk(false);
    } catch (error) {
      setOk(false);
      toast.error(`${error.response.data.message}`);
    }
  };
  return (
    <div className="me-5">
      {ok && (
        <LoadingOutlined
          spin
          className="d-flex justify-content-center display-1 text-primary p-5"
        />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          autoFocus
          placeholder="Category Name Here (minimum 2 chars)"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        />

        <button
          type="submit"
          className="btn btn-success mt-3"
          disabled={!category || category.length < 2 || ok}
        >
          Create Category
        </button>
      </form>
    </div>
  );
}

export default CategoryCreate;
