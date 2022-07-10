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

const Editor = ({ productId, data, isEdit, headerText, ImgUpload }) => {
  const navigate = useNavigate();

  const titleInput = useRef();
  const bodyInput = useRef();

  const [state, setState] = useState({});

  useEffect(() => {
    if (isEdit) {
      Axios.get(`/api/board/products_by_id?id=${productId}`)
        .then((response) => {
          setState(response.data);
        })
        .catch((err) => alert(err));
    } else {
      setState(data);
    }
  }, []);

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (state.title.length < 1) {
      titleInput.current.focus();
      return;
    }
    if (state.body.length < 1) {
      bodyInput.current.focus();
      return;
    }

    if (!isEdit) {
      Axios.post("/api/board", state).then((response) => {
        if (response.data.success) {
          alert("등록이 완료되었습니다.");
          navigate("/board/list");
        } else {
          alert("등록이 실패하였습니다.");
          console.log(response.data);
        }
      });
    } else {
      Axios.post("/api/board/fix", state).then((response) => {
        if (response.data.success) {
          alert("수정이 완료되었습니다.");
          console.log(response);
          navigate("/board/list");
        } else {
          alert("수정이 실패하였습니다.");
          console.log(response.data);
        }
      });
    }
  };

  return (
    <Container>
      <div
        className="Editor
     "
      >
        <h1>{headerText}</h1>
        <br />
        <br />

        <form onSubmit={handleSubmit}>
          <label>카테고리</label>

          <select
            name="product_type"
            onChange={handleChangeState}
            value={state.product_type || ""}
            style={{ width: "445px" }}
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
            name="title"
            placeholder="제목을 입력하세요."
            onChange={handleChangeState}
            value={state.title || ""}
            style={{ width: "440px" }}
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
          >
            {ImgUpload}
          </textarea>

          <br />
          <br />
          <button className="submit-button">입력</button>
        </form>
      </div>
    </Container>
  );
};

export default Editor;
