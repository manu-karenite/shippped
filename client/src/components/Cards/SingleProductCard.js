import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  StarTwoTone,
  FrownOutlined,
} from "@ant-design/icons";
import _ from "lodash";
import ProductItem from "./ProductItem.js";
import StarRatings from "react-star-ratings";
import RatingsModal from "../Modals/RatingsModal.js";
import { Card, Tooltip } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { add } from "../../functions/wishlistAxios.js";
function SingleProductCard({ data, avg, numRatings }) {
  const traits = data;
  const arr = data.images;
  const { cart, drawer, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [tooltip, setTooltip] = useState("Add to Cart");
  const [stars, setStars] = useState(avg);
  const [productId, setProductId] = useState("");
  const [wish, setWish] = useState("");
  const handleAddToCart = () => {
    setTooltip("Item Added to Cart");
    //create cart array
    let cart = [];
    //get anything in cart from localstorage if it exists
    if (typeof window !== "undefined") {
      //if already in local storage, create
      if (window.localStorage.getItem("cart")) {
        cart = JSON.parse(window.localStorage.getItem("cart"));
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

  const addWishlist = (e) => {
    setWish("Added to Wishlist");
    //now we need to add this item to the wishlist.......
    add(user.token, data._id)
      .then((res) => toast.success("Item Added to Wishlist"))
      .catch((err) => toast.error(err));
  };
  return (
    <>
      <div className="col-md-7">
        {arr && arr.length > 0 && (
          <Carousel
            showArrows={true}
            autoPlay={true}
            interval={2000}
            infiniteLoop={true}
          >
            {arr &&
              arr.length > 0 &&
              arr.map((curr, index) => {
                return (
                  <div key={curr.public_id}>
                    <img src={curr.url} alt="Carousel Images" />
                  </div>
                );
              })}
          </Carousel>
        )}
        {(!arr || arr.length === 0) && (
          <Carousel
            showArrows={true}
            autoPlay={true}
            interval={2000}
            infiniteLoop={true}
          >
            <div>
              <img
                src="https://res.cloudinary.com/techbuy/image/upload/v1640892093/defaultImg_n9wkam.jpg"
                alt="Carousel Images"
              />
            </div>
          </Carousel>
        )}
      </div>
      <div className="col-md-5">
        <h1 className="bg-info p-3 text-center">{data.title}</h1>
        <center>
          <StarRatings
            rating={avg}
            starRatedColor="blue"
            numberOfStars={5}
            isSelectable={false}
            isAggregateRating={true}
          />
          (&nbsp;
          {numRatings})
        </center>
        <Card
          actions={[
            <>
              {data.quantity > 0 && (
                <Tooltip title={tooltip}>
                  <a onClick={handleAddToCart}>
                    <ShoppingCartOutlined
                      style={{ fontSize: "20px", color: "magenta" }}
                    />
                    <br />
                    Add to Cart
                  </a>
                </Tooltip>
              )}
              {data.quantity <= 0 && (
                <Tooltip title="Out of Stock">
                  <FrownOutlined
                    style={{ fontSize: "20px", color: "magenta" }}
                  />
                  <br />
                  Out of Stock
                </Tooltip>
              )}
            </>,
            <>
              <Tooltip title={wish}>
                <a onClick={addWishlist}>
                  <HeartOutlined style={{ fontSize: "20px", color: "red" }} />
                  <br />
                  Add to Wishlist
                </a>
              </Tooltip>
            </>,
            <>
              <StarTwoTone twoToneColor="red" style={{ fontSize: "20px" }} />
              <br />
              <RatingsModal stars={stars} productId={productId}>
                <StarRatings
                  rating={stars}
                  starRatedColor="red"
                  changeRating={(newRating, name) => {
                    setStars(newRating);
                    setProductId(name);
                  }}
                  numberOfStars={5}
                  isSelectable={true}
                  name={data._id}
                  isAggregateRating={true}
                />
              </RatingsModal>
            </>,
          ]}
        >
          <ProductItem data={data} />
        </Card>
      </div>
    </>
  );
}

export default SingleProductCard;
