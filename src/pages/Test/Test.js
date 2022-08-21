import axios from "axios";
import React, { useEffect } from "react";
import baseUrl from "../../baseUrl";

const Test = () => {
  const [data, setData] = React.useState([]);
  useEffect(() => {
    axios
      .get(`${baseUrl}`)
      .then((res) => {
        setData(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      {data.map((product) => (
        <div key={product.id}>
          {product.title}
          {product.price}
        </div>
      ))}
    </>
  );
};

export default Test;
