import React from "react";
import ModalImage from "react-modal-image";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";
import { Select, InputNumber } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
const { Option } = Select;
function ProductCheckoutCard({ p }) {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const handleChange = (value) => {
    //get the item from localstorage first
    let fromCart = [];
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("cart")) {
        fromCart = JSON.parse(window.localStorage.getItem("cart"));
      }
      for (let i = 0; i < fromCart.length; i++) {
        if (fromCart[i]._id.toString() === p._id.toString()) {
          //change the color
          fromCart[i].color = value;
        }
      }
      //set to the local localStorage
      window.localStorage.setItem("cart", JSON.stringify(fromCart));
      //dispatch to redux
      dispatch({
        type: "ADD_TO_CART",
        payload: fromCart,
      });
    }
  };
  const onChangeQuantity = (value) => {
    if (value > p.quantity) {
      toast.error(`Available Quantity is : ${p.quantity}`);
      return;
    }
    let fromCart = [];
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("cart")) {
        fromCart = JSON.parse(window.localStorage.getItem("cart"));
      }
      for (let i = 0; i < fromCart.length; i++) {
        if (fromCart[i]._id.toString() === p._id.toString()) {
          //change the color
          fromCart[i].count = value;
        }
      }
      //set to the local localStorage
      window.localStorage.setItem("cart", JSON.stringify(fromCart));
      //dispatch to redux
      dispatch({
        type: "ADD_TO_CART",
        payload: fromCart,
      });
    }
  };
  const removeProduct = () => {
    let fromCart = [];
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("cart")) {
        fromCart = JSON.parse(window.localStorage.getItem("cart"));
      }
      for (let i = 0; i < fromCart.length; i++) {
        if (fromCart[i]._id.toString() === p._id.toString()) {
          //change the color
          fromCart.splice(i, 1);
        }
      }
      //set to the local localStorage
      window.localStorage.setItem("cart", JSON.stringify(fromCart));
      //dispatch to redux
      dispatch({
        type: "ADD_TO_CART",
        payload: fromCart,
      });
    }
  };
  const colors = ["black", "silver", "red", "golden", "cyan"];
  return (
    <tbody>
      <tr>
        <td style={{ width: "150px", height: "auto" }}>
          {p.images.length > 0 ? (
            <ModalImage
              small={p.images[0].url}
              large={p.images[0].url}
              alt="Hello World!"
            />
          ) : (
            <ModalImage
              small={
                "https://res.cloudinary.com/techbuy/image/upload/v1640892093/defaultImg_n9wkam.jpg"
              }
              large={
                "https://res.cloudinary.com/techbuy/image/upload/v1640892093/defaultImg_n9wkam.jpg"
              }
              alt="Product Image Here"
            />
          )}
        </td>
        <td>{p.title}</td>
        <td>{p.price}</td>
        <td>{p.brand}</td>
        <td>
          <Select
            defaultValue={p.color}
            style={{ width: 120 }}
            onChange={handleChange}
          >
            {colors.map((curr, index) => {
              return (
                <Option key={index} value={curr}>
                  {curr}
                </Option>
              );
            })}
          </Select>
        </td>
        <td>
          <InputNumber
            min={1}
            defaultValue={p.count}
            onChange={onChangeQuantity}
          />
        </td>
        <td>
          {p.shipping ? (
            <CheckCircleTwoTone
              twoToneColor="#69fe05"
              style={{ fontSize: "20px" }}
            />
          ) : (
            <CloseCircleTwoTone
              style={{ fontSize: "20px" }}
              twoToneColor="#FF0000"
            />
          )}
        </td>
        <td>
          <a onClick={removeProduct}>
            <DeleteTwoTone twoToneColor={"red"} style={{ fontSize: "20px" }} />
          </a>
        </td>
      </tr>
    </tbody>
  );
}

export default ProductCheckoutCard;
