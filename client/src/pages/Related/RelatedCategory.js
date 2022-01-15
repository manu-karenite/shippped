import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpecificCategory } from "../../functions/catagoriesAxios.js";
import { prodsFromSubs } from "../../functions/productAxios.js";
import ProductCard from "../../components/Cards/ProductCard.js";
import { toast } from "react-toastify";

function RelatedCategory() {
  const [prods, setProds] = useState([]);
  const [items, setItems] = useState(0);
  const [pName, setPName] = useState("");
  const [categ, setCateg] = useState({});
  const params = useParams();

  //for getting category details here
  const getCateg = () => {
    getSpecificCategory(params.slug)
      .then((res) => {
        setCateg(res.data.data);
      })
      .catch((err) => toast.error(err));
  };

  useEffect(() => {
    getCateg();
  }, []);
  //for getiing producys related to some category
  const getData = () => {
    prodsFromSubs(params.slug)
      .then((res) => {
        setProds(res.data.result);
        setItems(res.data.length);
      })
      .catch((err) => toast.error(err));
  };
  useEffect(() => {
    getData();
  }, []);
  //Products-Load finished here
  let productName = "";
  useEffect(() => {
    if (items <= 1) {
      setPName("Product");
    } else {
      setPName("Products");
    }
  }, []);

  return (
    <div className="m-5 offset-md-5">
      {" "}
      <h6 className="jumbotron display-3 p-3 mt-5 mb-5 text-center fs-3">
        {items} {pName} found in "{categ.name}" Category
      </h6>
      <div className="container mb-4 mt-4">
        <div className="row align-items-start">
          {prods.map((traits) => {
            return (
              <div className="col-4" key={prods._id}>
                <ProductCard traits={traits} key={traits._id} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RelatedCategory;
