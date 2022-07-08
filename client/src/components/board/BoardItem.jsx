import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, Route, useParams } from "react-router-dom";

import styled from "styled-components";
import BoardEach from "./BoardEach";

const BoardItem = () => {
  const { productId } = useParams();
  const [Product, setProduct] = useState({});

  useEffect(() => {
    axios
      .get(`/api/board/products_by_id?id=${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((err) => alert(err));
  }, []);
  return (
    <div className="DiaryItem">
      <h5>{Product.product_type}</h5>
      <h2>{Product.title}</h2>
      <p>{Product.body}</p>
    </div>
  );
};

export default BoardItem;
