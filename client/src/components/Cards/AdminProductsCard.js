import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteOne } from "../../functions/productAxios.js";
import { Card } from "antd";
import { useSelector } from "react-redux";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
const { Meta } = Card;

function AdminProductsCard({ traits, deleting, setDeleting, loadProducts }) {
  const { user } = useSelector((state) => ({ ...state }));
  const { title, description, images, slug } = traits;

  const deleteHandler = async (slug) => {
    setDeleting(true);
    try {
      const result = await deleteOne(user.token, slug);
      loadProducts();
      setDeleting(false);
    } catch (error) {
      setDeleting(false);
    }
  };
  return (
    <div className="mb-4 mt-4">
      <Card
        className="p-2"
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            height="195"
            alt={slug}
            src={
              images && images.length > 0
                ? images[0].url
                : "https://res.cloudinary.com/techbuy/image/upload/v1640892093/defaultImg_n9wkam.jpg"
            }
          />
        }
        actions={[
          <Link to={`/admin/product/${slug}`}>
            <EditTwoTone />
          </Link>,
          <DeleteTwoTone onClick={() => deleteHandler(slug)} />,
        ]}
      >
        <Meta
          className="text-center"
          title={title}
          description={`${description.substring(0, 20)}...`}
        />
      </Card>
    </div>
  );
}

export default AdminProductsCard;
