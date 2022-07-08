import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Axios from "axios";

import ImgUpload from "./ImgUpload";

const Container = styled.div`
  max-width: 500px;
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
const ProductTypes = [
  { key: 1, value: "판매" },
  { key: 2, value: "구매" },
];

const Write = () => {
  const navigate = useNavigate();

  const titleInput = useRef();
  const bodyInput = useRef();

  const [state, setState] = useState({
    Title: "",
    Body: "",
    ProductType: ProductTypes[0].value,
    ProductCategory: "생략",

    // Images: [],
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      title: state.Title,
      body: state.Body,
      product_type: state.ProductType,
      product_catagory: "생략",
      // author: props.user.userData._id,
      // images: [],
    };

    if (state.Title.length < 1) {
      titleInput.current.focus();
      return;
    }
    if (state.Body.length < 1) {
      bodyInput.current.focus();
      return;
    }

    Axios.post("/api/board", body).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        alert("등록이 완료되었습니다.");
        console.log(response.data);
        navigate("/board/list");
      } else {
        alert("등록이 실패하였습니다.");
      }
    });
  };

  return (
    <Container>
      <div className="Write">
        <h1>카페 글쓰기</h1>
        <br />
        <br />

        <form onSubmit={handleSubmit}>
          <label>카테고리</label>
          <select
            name="ProductType"
            onChange={handleChangeState}
            value={state.ProductType}
            style={{ width: "240px" }}
          >
            {ProductTypes.map((item) => (
              <option key={item.key} value={item.value}>
                {" "}
                {item.value}
              </option>
            ))}
          </select>
          <br />
          <br />

          {/*<label>제품 종류</label>*/}
          {/*<select*/}
          {/*  name="ProductCategory"*/}
          {/*  onChange={handleChangeState}*/}
          {/*  value={state.ProductCategory}*/}
          {/*  style={{ width: "240px" }}*/}
          {/*>*/}
          {/*  {ProductCategories.map((item) => (*/}
          {/*    <option key={item.key} value={item.value}>*/}
          {/*      {" "}*/}
          {/*      {item.value}*/}
          {/*    </option>*/}
          {/*  ))}*/}
          {/*</select>*/}
          {/*<br />*/}
          {/*<br />*/}

          <label>제품명</label>
          <input
            ref={titleInput}
            type="text"
            name={"Title"}
            placeholder="제목을 입력하세요."
            onChange={handleChangeState}
            value={state.Title}
            style={{ width: "230px" }}
          />
          <br />
          <br />
          {/*<ImgUpload />*/}

          <label>제품 설명</label>
          <textarea
            ref={bodyInput}
            name="Body"
            cols="30"
            rows="10"
            placeholder={"내용을 입력하세요."}
            onChange={handleChangeState}
            value={state.Body}
          ></textarea>

          <br />
          <br />
          <button className="submit-button">입력</button>
        </form>
      </div>
    </Container>
  );
};

export default Write;
