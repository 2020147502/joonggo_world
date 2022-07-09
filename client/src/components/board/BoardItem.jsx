import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, Route, useParams, useNavigate } from "react-router-dom";

import styled from "styled-components";
import BoardEach from "./BoardEach";

const Container = styled.div`
  max-width: 800px;
  margin: 0px auto;

  h1 {
    text-transform: uppercase;
    font-size: 50px;
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
  }
`;

const BoardItem = () => {
  const { productId } = useParams();
  const [Product, setProduct] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/api/board/products_by_id?id=${productId}`)
      .then((response) => {
        setProduct(response.data);
        console.log(response.data);
      })
      .catch((err) => alert(err));
  }, []);

  const handleFixClick = () => {
    if (window.confirm("수정하시겠습니까?")) {
      navigate(`../board/fix/${Product._id}`);
    }
  };
  const handleDeleteClick = () => {
    const body = {
      product_id: Product.product_id,
    };
    if (window.confirm("정말 삭제하시겠습니까?")) {
      axios
        .post("/api/board/delete", body)
        .then((response) => {
          console.log(response);
          navigate("../board/list");
        })
        .catch((err) => alert(err));
    }
  };

  return (
    <Container className="DiaryItem">
      <h5>{Product.product_type}</h5>
      <h2>{Product.title}</h2>
      <button onClick={handleFixClick}>수정</button>
      <button onClick={handleDeleteClick}>삭제</button>
      <hr />
      <p>{Product.body}</p>
    </Container>
  );
};

export default BoardItem;
