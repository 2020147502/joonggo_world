import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Axios from "axios";

import ImgUpload from "./ImgUpload";
import axios from "axios";

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

const FixWrite = () => {
  const navigate = useNavigate();

  const { productId } = useParams();

  const titleInput = useRef();
  const bodyInput = useRef();

  const [state, setState] = useState({});

  useEffect(() => {
    axios
      .get(`/api/board/products_by_id?id=${productId}`)
      .then((response) => {
        setState(response.data);
      })
      .catch((err) => alert(err));
  }, []);

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      title: state.title,
      body: state.body,
      product_type: state.product_type,
      product_catagory: "생략",
      // author: props.user.userData._id,
      // images: [],
    };

    if (state.title.length < 1) {
      titleInput.current.focus();
      return;
    }
    if (state.body.length < 1) {
      bodyInput.current.focus();
      return;
    }

    Axios.post("/api/board/fix", body).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        alert("수정이 완료되었습니다.");
        console.log(response.data);
        navigate("/board/list");
      } else {
        alert("수정이 실패하였습니다.");
      }
    });
  };

  return (
    <Container>
      <div className="FixWrite">
        <h1>수정하기</h1>
        <br />
        <br />

        <form onSubmit={handleSubmit}>
          <label>카테고리</label>
          <select
            name="product_type"
            onChange={handleChangeState}
            value={state.product_type || ""}
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

          <label>제품명</label>
          <input
            ref={titleInput}
            type="text"
            name={"title"}
            placeholder="제목을 입력하세요."
            onChange={handleChangeState}
            value={state.title || ""}
            style={{ width: "230px" }}
          />
          <br />
          <br />
          {/*<ImgUpload />*/}

          <label>제품 설명</label>
          <textarea
            ref={bodyInput}
            name="body"
            cols="30"
            rows="10"
            placeholder={"내용을 입력하세요."}
            onChange={handleChangeState}
            value={state.body || ""}
          ></textarea>

          <br />
          <br />
          <button className="submit-button">입력</button>
        </form>
      </div>
    </Container>
  );
};

export default FixWrite;
