//importing react components
import React, { useState } from "react";
import { useParams } from "react-router-dom";
//importing product edit components
import ProductEdit from "./ProductEdit.js";
import AdminSidebar from "../../../components/Navigation/AdminSidebar.js";
function OneProduct() {
  //get the slug first
  const parameters = useParams();

  //CREATE THE STATES FOR EACH DATA TYPE
  const [title, setTitle] = useState("");
  const [slugId, setSlugId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [shipping, setShipping] = useState(false);
  const [color, setColor] = useState("");
  const [brand, setBrand] = useState("");
  return (
    <div className="container-fluid pd-4">
      <div className="row">
        <div className="col-md-1">
          <AdminSidebar />
        </div>
        <div className="offset-md-1 col-md-7">
          <div className="offset-md-1 mt-3">
            <h4> Product Details Here</h4>
            <hr />
            <ProductEdit
              slug={parameters.slug}
              title={title}
              setTitle={setTitle}
              slugId={slugId}
              setSlugId={setSlugId}
              description={description}
              setDescription={setDescription}
              price={price}
              setPrice={setPrice}
              quantity={quantity}
              setQuantity={setQuantity}
              shipping={shipping}
              setShipping={setShipping}
              color={color}
              setColor={setColor}
              brand={brand}
              setBrand={setBrand}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OneProduct;
