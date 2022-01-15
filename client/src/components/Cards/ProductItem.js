import React from "react";

function ProductItem({ data }) {
  const subs = data.subcategory;
  return (
    <table className="table table-striped">
      <tbody>
        <tr>
          <td>Price</td>
          <td> ₹ {data.price}</td>
        </tr>
        <tr>
          <td>SubCategories</td>
          <td>
            {subs &&
              subs.length > 0 &&
              subs.map((curr, res) => {
                return curr.name + "  ";
              })}
          </td>
        </tr>
        <tr>
          <td>Shipping</td>
          <td>{data.shipping === true ? "Yes" : "No"}</td>
        </tr>
        <tr>
          <td>Color</td>
          <td>{data.color}</td>
        </tr>
        <tr>
          <td>Brand</td>
          <td>{data.brand}</td>
        </tr>
        <tr>
          <td>Available</td>
          <td>{data.quantity}</td>
        </tr>
        <tr>
          <td>Sold</td>
          <td>{data.sold}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default ProductItem;
