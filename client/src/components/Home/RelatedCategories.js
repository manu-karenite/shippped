import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { getAllCategories } from "../../functions/catagoriesAxios.js";

function RelatedCategories() {
  const [categs, setCategs] = useState([]);
  const doTask = () => {
    getAllCategories()
      .then((res) => {
        setCategs(res.data.data.categories);
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
            <div className="d-grid  col-4 mt-2 mb-3" key={curr._id}>
              <button
                className="btn btn-raised  btn-lg related-categ "
                type="button"
              >
                <Link to={`/category/${curr.slug}`}>
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

export default RelatedCategories;
