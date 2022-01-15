import React, { useEffect, useState } from "react";

//importing custom components from
import Jumbotron from "../components/Cards/Jumbotron.js";
import { listProducts, fetchProducts } from "../functions/productAxios.js";
import ProductCard from "../components/Cards/ProductCard.js";
import NewArrival from "../components/Home/NewArrival.js";
import BestSeller from "../components/Home/BestSeller.js";
import RelatedCategories from "../components/Home/RelatedCategories.js";
import RelatedSubs from "../components/Home/RelatedSubs.js";
import Title from "../components/Utilities/Title.js";

function Home() {
  return (
    <>
      <Title />
      <div className="jumbotron text-danger h1 display-5 text-center font-weight-bold">
        <Jumbotron />
      </div>
      <NewArrival />
      <BestSeller />
      <h5 className="jumbotron display-6 p-3 mt-5 mb-5 text-center">
        Categories
      </h5>
      <RelatedCategories />
      <h5 className="jumbotron display-6 p-3 mt-5 mb-5 text-center">
        Sub-Categories
      </h5>
      <RelatedSubs />
    </>
  );
}

export default Home;
