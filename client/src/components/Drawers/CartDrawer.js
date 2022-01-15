import React from "react";
import { Drawer, Button, Card } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const { Meta } = Card;
function CartDrawer() {
  const { drawer, cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const handleClose = () => {
    //close the drawerReducer
    dispatch({
      type: "TOGGLE_DRAWER",
      payload: false,
    });
  };
  const closeDrawer = () => {
    dispatch({
      type: "TOGGLE_DRAWER",
      payload: false,
    });
  };
  return (
    <Drawer
      placement="right"
      onClose={handleClose}
      visible={drawer}
      keyboard={true}
      title="Cart Items"
      footer={user && user.token ? `Cart | ${user.name}` : "Cart | Guest"}
      width="278"
    >
      {cart.length > 0 &&
        cart.map((curr, index) => {
          return (
            <Card
              className="mb-2"
              key={index}
              hoverable
              style={{ width: 240 }}
              cover={
                <img
                  className="p-2"
                  alt="Product Img"
                  src={
                    curr.images.length > 0
                      ? curr.images[0].url
                      : "https://res.cloudinary.com/techbuy/image/upload/v1640892093/defaultImg_n9wkam.jpg"
                  }
                />
              }
            >
              <Meta
                title={curr.title}
                description={`${curr.count} Nos. X ₹ ${curr.price}`}
              />
            </Card>
          );
        })}
      <Link to="/cart" onClick={closeDrawer}>
        <Button type="primary" className="mt-3 btn-success" block>
          Check Cart
        </Button>
      </Link>
    </Drawer>
  );
}

export default CartDrawer;
