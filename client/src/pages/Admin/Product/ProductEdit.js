//importing react components
import React, { useEffect } from "react";
import { Select } from "antd";

//importing product edit components
import { getOne } from "../../../functions/productAxios.js";
import { toast } from "react-toastify";
const { Option } = Select;
function ProductEdit({
  slug,
  title,
  setTitle,
  slugId,
  setSlugId,
  description,
  setDescription,
  price,
  setPrice,
  quantity,
  setQuantity,
  shipping,
  setShipping,
  color,
  setColor,
  brand,
  setBrand,
}) {
  //for-loading data of the slugged product
  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = () => {
    getOne(slug)
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  return (
    <form>
      <div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            aria-describedby="emailHelp"
            placeholder="Change Title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            rows={3}
            defaultValue={""}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="number" className="form-control" id="price" />
        </div>
        <div className="form-group">
          <label htmlFor="shipping">Shipping</label>
          <select id="shipping" className="form-control">
            <option selected>Yes</option>
            <option>No</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input type="number" className="form-control" id="quantity" />
        </div>

        <div className="form-group">
          <label htmlFor="brand">Brand</label>
          <select id="brand" className="form-control"></select>
        </div>
        <div className="form-group">
          <label htmlFor="color">Color</label>
          <select id="color" className="form-control"></select>
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select id="category" className="form-control"></select>
        </div>
        <div>
          <label htmlFor="subcategory">Subcategories</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="select one country"
            defaultValue={["china"]}
            onChange={(value) => {
              console.log(value);
            }}
            optionLabelProp="label"
            size="large"
          >
            <Option value="china" label="China">
              <div className="demo-option-label-item">
                <span role="img" aria-label="China">
                  🇨🇳
                </span>
                China (中国)
              </div>
            </Option>
            <Option value="usa" label="USA">
              <div className="demo-option-label-item">
                <span role="img" aria-label="USA">
                  🇺🇸
                </span>
                USA (美国)
              </div>
            </Option>
            <Option value="japan" label="Japan">
              <div className="demo-option-label-item">
                <span role="img" aria-label="Japan">
                  🇯🇵
                </span>
                Japan (日本)
              </div>
            </Option>
            <Option value="korea" label="Korea">
              <div className="demo-option-label-item">
                <span role="img" aria-label="Korea">
                  🇰🇷
                </span>
                Korea (韩国)
              </div>
            </Option>
          </Select>
        </div>

        <button type="submit" className="btn btn-danger mt-4 md-5">
          Submit
        </button>
      </div>
    </form>
  );
}

export default ProductEdit;
