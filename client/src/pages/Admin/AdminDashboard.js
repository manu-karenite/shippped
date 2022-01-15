//importing react libraries
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//importing custom components
import AdminSidebar from "../../components/Navigation/AdminSidebar.js";
import { getAdminOrders } from "../../functions/orderAxios.js";
import AdminOrderCard from "../../components/Cards/AdminOrderCard.js";
import { toast } from "react-toastify";

//importing third-party components
function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  useEffect(() => {
    getOrders();
  }, []);
  const getOrders = () => {
    getAdminOrders(user.token)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => toast.error(err));
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-1">
          <AdminSidebar />
        </div>
        <div className="col-md-11">
          <h3 className="text-center mt-2 mb-2" style={{ color: "maroon" }}>
            All Orders
          </h3>
          <div>
            {orders && orders.length <= 0
              ? "No Orders Found"
              : orders.map((el, index) => {
                  return (
                    <AdminOrderCard
                      key={index}
                      el={el}
                      status={status}
                      setStatus={setStatus}
                      getOrders={getOrders}
                    />
                  );
                })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
