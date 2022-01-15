import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
//importing the cutsom Components
import { getOne } from "../functions/productAxios.js";
import SingleProductCard from "../components/Cards/SingleProductCard.js";
import { Tabs } from "antd";
const { TabPane } = Tabs;
function Product() {
  const [data, setData] = useState({});
  const [avg, setAvg] = useState(0);
  const [numRatings, setNumRatings] = useState(0);

  const p = useParams();
  useEffect(() => {
    fetchOne();
  }, []);
  const fetchOne = () => {
    getOne(p.slug)
      .then((res) => {
        setData(res.data.message);
        const starsFromAPI = res.data.message.ratings;

        if (starsFromAPI.length > 0) {
          const sum = starsFromAPI.reduce((sum, curr) => {
            return sum + curr.star;
          }, 0);
          const avg1 = sum / res.data.message.ratings.length;

          setAvg(avg1);
          setNumRatings(res.data.message.ratings.length);
        }
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row pt-4">
        {<SingleProductCard data={data} avg={avg} numRatings={numRatings} />}
      </div>
      <Tabs type="card" size="large" className="mb-3">
        <TabPane tab="Description" key="1">
          {data.description}
        </TabPane>
        <TabPane tab="More Information" key="2">
          Contact +91 XXXX XXX XXX for more informations
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Product;
