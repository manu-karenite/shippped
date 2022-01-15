import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAllSubCategories } from "../../functions/subcategoriesAxios.js";

function RelatedSubs() {
  const [categs, setCategs] = useState([]);
  const doTask = () => {
    getAllSubCategories()
      .then((res) => {
        setCategs(res.data.data.subcategory.slice(0, 8));
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  useEffect(() => {
    doTask();
  }, []);
  return (
    <div className="container">
      <div className="row justify-content-center">
        {categs.map((curr, index) => {
          return (
            <div className="d-grid  col-4 mt-2 mb-3 ">
              <button className="btn btn-lg" type="button">
                <Link to={`/subcategory/${curr.slug}`}>
                  {curr.name.toUpperCase()}
                </Link>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RelatedSubs;
