import React, { useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { Modal, Button } from "antd";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setStars } from "../../functions/productAxios.js";
import { toast } from "react-toastify";

function RatingsModal({ children, stars, productId }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => ({ ...state }));
  const p = useParams();
  const slug = { p };
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onClickHandler = (e) => {
    //what if the user is loggedIn
    if (user && user.token) {
      setIsModalVisible(true);
    } else {
      navigate("/login", {
        replace: true,
        state: { from: location },
      });
    }
  };

  return (
    <>
      <div onClick={onClickHandler}>
        {user && user.token ? "Leave Rating" : "Login to Leave Rating"}
      </div>
      <Modal
        title="Leave a Rating"
        visible={isModalVisible}
        onOk={() => {
          setIsModalVisible(false);
          //can we set the api here ?
          setStars(stars, productId, user.token)
            .then((res) =>
              toast.success("Thanks for Review! Ratings will appear soon")
            )
            .catch((err) => toast.error(err));
        }}
        onCancel={() => {
          setIsModalVisible(false);
        }}
      >
        {children}
      </Modal>
    </>
  );
}

export default RatingsModal;
