//importing react components
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//importing custom components from project
import SidebarUser from "../../components/Navigation/SidebarUser.js";
import { getOrders } from "../../functions/orderAxios.js";
import PurchaseCard from "../../components/Cards/PurchaseCard.js";

//importing third party Components
import { toast } from "react-toastify";
function History() {
  //get the user.token.....
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);

  //loading the dashboard.......
  useEffect(() => {
    getMyOrders();
  }, []);
  const getMyOrders = () => {
    getOrders(user.token)
      .then((res) => setOrders(res.data))
      .catch((err) => toast.error(err));
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <SidebarUser />
        </div>
        <div className="col-md-10">
          <h3 className="text-center mt-2 mb-2" style={{ color: "blue" }}>
            Order History
          </h3>
          <div>
            {orders && orders.length <= 0
              ? "No Orders Found"
              : orders.map((el, index) => {
                  return <PurchaseCard key={index} el={el} />;
                })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default History;
