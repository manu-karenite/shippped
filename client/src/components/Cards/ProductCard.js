import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import {
  EyeOutlined,
  ShoppingCartOutlined,
  FrownOutlined,
} from "@ant-design/icons";
import { Card, Tooltip } from "antd";
import StarRatings from "react-star-ratings";
import { useSelector, useDispatch } from "react-redux";
const { Meta } = Card;

function ProductCard({ traits }) {
  const { cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [tooltip, setTooltip] = useState("Add to Cart");
  const { title, description, images, slug, ratings, quantity } = traits;
  let total = 0;
  for (let i = 0; i < ratings.length; i++) {
    total = total + ratings[i].star;
  }
  if (ratings.length > 0) {
    total = total / ratings.length;
  }

  const handleAddToCart = () => {
    setTooltip("Item Added to Cart");
    //create cart array
    let cart = [];
    //get anything in cart from localstorage if it exists
    if (typeof window !== "undefined") {
      //if already in local storage, create
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      //push new item to the cart array
      cart.push({ ...traits, count: 1 });
      //save in the local localStorage
      //prevent the duplicates
      let finalCart = _.uniqWith(cart, _.isEqual);

      window.localStorage.setItem("cart", JSON.stringify(finalCart));
      dispatch({
        type: "ADD_TO_CART",
        payload: finalCart,
      });
      dispatch({
        type: "TOGGLE_DRAWER",
        payload: true,
      });
    }
  };

  return (
    <>
      <div className="text-justify m-2">
        <StarRatings
          starDimension="20px"
          rating={total}
          starRatedColor={total <= 2 ? "red" : "green"}
          numberOfStars={5}
          isSelectable={false}
          isAggregateRating={true}
        />
        &nbsp;&nbsp; ({ratings.length})
      </div>
      <Card
        className="p-2"
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            height="220"
            width="auto"
            alt={slug}
            style={{ objectFit: "contain" }}
            src={
              images && images.length > 0
                ? images[0].url
                : "https://res.cloudinary.com/techbuy/image/upload/v1640892093/defaultImg_n9wkam.jpg"
            }
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined style={{ fontSize: "20px", color: "#08c" }} />
          </Link>,
          <>
            {quantity > 0 && (
              <Tooltip title={tooltip}>
                <a onClick={handleAddToCart}>
                  <ShoppingCartOutlined
                    style={{ fontSize: "20px", color: "red" }}
                  />
                </a>
              </Tooltip>
            )}
            {quantity <= 0 && (
              <Tooltip title="Out of Stock">
                <FrownOutlined style={{ fontSize: "20px", color: "red" }} />
              </Tooltip>
            )}
          </>,
        ]}
      >
        <Meta
          className="text-center"
          title={title}
          description={`${description.substring(0, 20)}...`}
        />
      </Card>
    </>
  );
}

export default ProductCard;
