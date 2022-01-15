import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Spin, Space } from "antd";
import Loader from "../../../components/Utilities/Loader.js";
import { Avatar, Image, Badge } from "antd";
import { UserOutlined } from "@ant-design/icons";
//import Resizer from "react-image-file-resizer";

//import { upload } from "../../../functions/cloudinaryAxios.js";

//importing antd Components
import { Form, Input, Button, Switch, InputNumber, Select } from "antd";

import { createProduct } from "../../../functions/productAxios.js";
import {
  getAllCategories,
  subFromCateg,
} from "../../../functions/catagoriesAxios.js";
import FileUpload from "../../../components/Utilities/FileUpload.js";
import { CloudUploadOutlined } from "@ant-design/icons";
import { destroy } from "../../../functions/cloudinaryAxios.js";

function ProductForm() {
  const { Option } = Select;
  const { user } = useSelector((state) => ({ ...state }));
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [color, setColor] = useState("black");
  const [brand, setBrand] = useState("apple");
  const [wait, setWait] = useState(false);
  const [categ, setCateg] = useState([]);
  const [catId, setCatId] = useState("");
  const [subcateg, setSubcateg] = useState([]);
  const [selectedSubCat, setSelectedSubCat] = useState([]);

  //----------------------------------------FOR CLOUDINARY-------------------------------------------------------
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  //---------------------------------------CLOUDINARY ENDS--------------------------------------------------------
  const handleCatChange = (valueChosen) => {
    setCatId(valueChosen);
  };
  const handleChange = (e) => {
    setSelectedSubCat(e);
  };
  useEffect(() => {
    loadCategories();
  }, []);
  useEffect(() => {
    setSelectedSubCat([]);
    catId !== "" && loadSubCateg(catId);
  }, [catId]);
  const loadSubCateg = (token) => {
    subFromCateg(token)
      .then((res) => {
        setSubcateg(res.data.data.subcategories);
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  const loadCategories = () => {
    getAllCategories()
      .then((res) => {
        setCateg(res.data.data.categories);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const deletePhotoHandler = (value) => {
    //first delete from the endpoint
    setUploading(true);

    destroy(user.token, value)
      .then((res) => {
        let filteredImages = images.filter((item) => {
          return item.public_id !== value;
        });
        setUploading(false);
        setImages(filteredImages);
      })
      .catch((err) => {
        toast.error(err);
        setUploading(false);
      });
  };

  const handleSubmit = async (e) => {
    setWait(true);
    const req = {
      title,
      description,
      price,
      quantity,
      shipping,
      color,
      brand,
      catId,
      selectedSubCat,
      images,
    };
    try {
      const result = await createProduct(user.token, req);
      setWait(false);
      toast.success(`Product has been created Succesfully`);
      setTitle("");
      setDescription("");
      setPrice("");
      setQuantity("");
      setShipping(false);
      setColor("black");
      setBrand("apple");
      setSelectedSubCat([]);
      setImages([]);
      window.location.reload();
    } catch (error) {
      setWait(false);
      toast.error(`Product Creattion failed`);
    }
  };

  return (
    <>
      {wait && (
        <center>
          <Space size="middle">
            <Spin
              size="large"
              className="d-flex justify-content-center display-1 text-primary p-5"
            />
          </Space>
        </center>
      )}

      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        {!uploading && images.length !== 0 && (
          <span>
            {images.map((curr, index) => {
              return (
                <Badge
                  count={"x"}
                  key={curr.url}
                  onClick={() => deletePhotoHandler(curr.public_id)}
                  className="me-5"
                >
                  <Avatar
                    shape="square"
                    size={128}
                    icon={<Image width={200} src={curr.url} />}
                  />
                </Badge>
              );
            })}
          </span>
        )}
        {uploading && <Loader />}
        <FileUpload
          images={images}
          setImages={setImages}
          uploading={uploading}
          setUploading={setUploading}
        />

        <Form.Item
          label="Title"
          rules={[
            {
              required: true,
              message: "Please input your title!",
            },
          ]}
        >
          <Input
            value={title}
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Description"
          rules={[
            {
              required: true,
              message: "Please input Product Description!",
            },
          ]}
        >
          <Input.TextArea
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Price"
          rules={[
            {
              type: "number",
              min: 1,
              required: true,
              message: "Please input Product Price!",
            },
          ]}
        >
          <InputNumber
            value={price}
            name="price"
            onChange={(value) => setPrice(value)}
          />
        </Form.Item>
        <Form.Item
          label="Shipping"
          rules={[
            {
              required: true,
              message: "Declare Shipping!",
            },
          ]}
        >
          <Switch
            name="shipping"
            checked={shipping}
            onChange={(e) => setShipping(e)}
          />
        </Form.Item>
        <Form.Item
          label="Quantity"
          rules={[
            {
              type: "number",
              min: 1,
              required: true,
              message: "Please enter the Quantity of Product",
            },
          ]}
        >
          <InputNumber
            value={quantity}
            name="quantity"
            onChange={(value) => setQuantity(value)}
          />
        </Form.Item>
        <Form.Item
          label="Select the Color"
          rules={[
            {
              required: true,
              message: "Please enter the Color of Product",
            },
          ]}
        >
          <Select
            placeholder="Please select a Color"
            value={color}
            onSelect={(value) => setColor(value)}
            name="color"
          >
            <Select.Option value="black">Black</Select.Option>
            <Select.Option value="silver">Silver</Select.Option>
            <Select.Option value="red">Red</Select.Option>
            <Select.Option value="golden">Golden</Select.Option>
            <Select.Option value="cyan">Cyan</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Select the Brand"
          rules={[
            {
              required: true,
              message: "Please enter the Brand of Product",
            },
          ]}
        >
          <Select
            placeholder="Please select a Brand"
            name="brand"
            value={brand}
            onSelect={(e) => setBrand(e)}
          >
            <Select.Option value="apple">Apple</Select.Option>
            <Select.Option value="samsung">Samsung</Select.Option>
            <Select.Option value="microsoft">Microsoft</Select.Option>
            <Select.Option value="asus">ASUS</Select.Option>
            <Select.Option value="lenovo">Lenovo</Select.Option>
          </Select>
        </Form.Item>
        {
          //HEHEHEHEHEH
        }
        <Form.Item
          label="Select the Category"
          rules={[
            {
              required: true,
              message: "Please enter the Brand of Product",
            },
          ]}
        >
          <Select
            placeholder="Please select a Category"
            name="category"
            onChange={handleCatChange}
          >
            {categ.map((curr, index) => {
              return (
                <Select.Option key={curr._id} value={curr._id}>
                  {curr.name}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
        <center>
          <p>{`Category Unique Identifier : ${catId}`}</p>
        </center>
        <Form.Item
          label="Subcategory"
          rules={[
            {
              required: true,
              message: "Please enter the Brand of Product",
            },
          ]}
        >
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select a SubCategory"
            defaultValue={[]}
            onChange={handleChange}
            allowClear
          >
            {subcateg.map((curr, index) => {
              return <Option key={curr._id}>{curr.name}</Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleSubmit}
            disabled={
              title === "" ||
              description === "" ||
              price === "" ||
              quantity === ""
            }
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default ProductForm;
