import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpecificSubCategory } from "../../functions/subcategoriesAxios.js";
import { prodsFromSubcategories } from "../../functions/productAxios.js";
import ProductCard from "../../components/Cards/ProductCard.js";
import { toast } from "react-toastify";
function RelatedSubs() {
  const [prods, setProds] = useState([]);
  const [items, setItems] = useState(0);
  const [pName, setPName] = useState("");
  const [categ, setCateg] = useState({});
  const params = useParams();

  //for getting category details here
  const getCateg = () => {
    getSpecificSubCategory(params.slug)
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
    prodsFromSubcategories(params.slug)
      .then((res) => {
        setProds(res.data.products);
        setItems(res.data.items);
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
      <h6 className="jumbotron display-3 p-3 mt-5 mb-5 text-center fs-4">
        {items} {pName} found in "{categ.name}" Sub-Category
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

export default RelatedSubs;
