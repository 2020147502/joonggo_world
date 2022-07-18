import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Axios from "axios";

import ImgUpload from "./ImgUpload";

const Container = styled.div`
  max-width: 600px;
  margin: 0px auto;

  h1 {
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 800;
    text-align: left;
  }
  hr {
    background-color: black;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  input,
  select {
    height: 30px;
  }
  select option[value=""][disabled] {
    display: none;
  }
  button {
    position: relative;
    border: 0;
    padding: 15px 15px;
    display: inline-block;
    text-align: center;
    border: none;
    border-radius: 10px;
    background-color: #5b50b4;
    color: white;
  }
  button:active {
    top: 4px;
  }
  input,
  select,
  textarea {
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const ProductTypes = [
  { key: 1, value: "판매" },
  { key: 2, value: "구매" },
];

const Editor = ({ productId, data, isEdit, headerText, ImgUpload }) => {
  const navigate = useNavigate();

  const categoryInput = useRef();
  const titleInput = useRef();
  const priceInput = useRef();
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

  //input 안의 value 변화 관리 함수
  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  //제출 관리 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    //유효성 검사
    if (state.product_type.length < 1) {
      categoryInput.current.focus();
      return;
    }
    if (state.title.length < 1) {
      titleInput.current.focus();
      return;
    }
    if (state.price <= 0) {
      bodyInput.current.focus();
      return;
    }
    if (state.body.length < 1) {
      bodyInput.current.focus();
      return;
    }

    //새 게시물을 쓰면 내용을 그대로 저장
    if (!isEdit) {
      Axios.post("/api/board", state).then((response) => {
        if (response.data.success) {
          alert("등록이 완료되었습니다.");
          // navigate("/board/list");
        } else {
          alert("등록이 실패하였습니다.");
          console.log(response.data);
        }
      });
    }
    //기존 게시물을 수정하면 기존 데이터를 바뀐 데이터로 수정해 저장
    else {
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
        <hr />

        <form onSubmit={handleSubmit}>
          <select
            name="product_type"
            onChange={handleChangeState}
            defaultValue={state.product_type || "default"}
            ref={categoryInput}
          >
            <option value="default" disabled hidden>
              카테고리를 선택하세요
            </option>
            {ProductTypes.map((item) => (
              <option key={item.key} value={item.value}>
                {" "}
                {item.value}
              </option>
            ))}
          </select>
          <br />

          <input
            ref={titleInput}
            type="text"
            name="title"
            placeholder="제품명을 입력하세요."
            onChange={handleChangeState}
            value={state.title || ""}
          />
          <br />

          <input
            ref={priceInput}
            type="number"
            step="10000"
            name="price"
            placeholder="가격을 입력하세요."
            onChange={handleChangeState}
            value={state.price || ""}
          />
          <br />

          {/*제품 설명 란에 이미지 첨부할 수 있는 기능 탑재*/}
          {ImgUpload}

          <br />
          <textarea
            ref={bodyInput}
            name="body"
            cols="30"
            rows="10"
            placeholder={"제품 설명을 입력하세요."}
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

export default Editor;
