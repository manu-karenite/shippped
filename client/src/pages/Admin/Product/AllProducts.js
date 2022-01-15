//importing functional components
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

//importing custom components
import AdminSidebar from "../../../components/Navigation/AdminSidebar.js";
import AdminProductsCard from "../../../components/Cards/AdminProductsCard.js";
import Loader from "../../../components/Utilities/Loader.js";
import { listProducts } from "../../../functions/productAxios.js";
function AllProducts() {
  const [prods, setProds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toDelete, setToDelete] = useState("");
  const [deleting, setDeleting] = useState(false);
  //-----------------FOR FETCHING THE PRODUCT DETAILS------------------
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    setLoading(true);
    listProducts(5)
      .then((res) => {
        setProds(res.data.data.result);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err);
        setLoading(false);
      });
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-1">
          <AdminSidebar />
        </div>
        <div className="col-md-11">
          <div className="offset-md-1 mt-3">
            <h2>All Products</h2>
            <hr />
            {loading && <Loader />}
            {deleting && <Loader />}
            <div>
              <div className="row justify-content-start">
                {prods.map((curr, index) => {
                  return (
                    <div className="col-4">
                      <AdminProductsCard
                        key={curr._id}
                        traits={curr}
                        deleting={deleting}
                        setDeleting={setDeleting}
                        loadProducts={loadProducts}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
