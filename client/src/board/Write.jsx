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
  { key: 1, value: "핸드폰" },
  { key: 2, value: "PC" },
  { key: 3, value: "상품권" },
  { key: 4, value: "도서" },
  { key: 5, value: "미용" },
  { key: 6, value: "가구" },
];

const Write = () => {
  // useEffect(() => {
  //   Axios.get("/api/login/").then((response) => {
  //     if (response.data.success) {
  //       alert("잘 가져왔습니다.");
  //       console.log(response.data[0]);
  //     } else {
  //       alert("실패하였습니다.");
  //     }
  //   });
  // }, []);
  const navigate = useNavigate();

  const titleInput = useRef();
  const bodyInput = useRef();

  const [Title, setTitle] = useState("");
  const [Body, setBody] = useState("");
  const [ProductID, setProductID] = useState(1);
  const [ProductType, setProductType] = useState("");
  const [Author, setAuthor] = useState("");
  // const [Views, setViews] = useState(0);
  // const [Images, setImages] = useState([]);

  const titleChangeHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const bodyChangeHandler = (event) => {
    setBody(event.currentTarget.value);
  };

  const productIDChangeHandler = (event) => {
    setProductID(ProductID + 1);
  };

  const productTypeChangeHandler = (event) => {
    setProductType(event.currentTarget.value);
  };

  // const authorChangeHandler = (event) => {
  //   setAuthor(event.currentTarget.value);
  // };

  // const updateImages = (newImages) => {
  //   setImages(newImages);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = {
      title: Title,
      body: Body,
      product_id: ProductID,
      product_type: ProductType,
      // author: ,
      views: 0,
      images: [],
    };

    // if (Title.length < 1) {
    //   titleInput.current.focus();
    //   return;
    // }
    // if (Body.length < 1) {
    //   bodyInput.current.focus();
    //   return;
    // }

    Axios.post("/api/board", body).then((response) => {
      console.log(response.data);
      if (response.data.success) {
        alert("등록이 완료되었습니다.");
        console.log(response.data);
        productIDChangeHandler();
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
          <label>제품 종류</label>
          <select
            onChange={productTypeChangeHandler}
            value={ProductType}
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

          <label>제목</label>
          <input
            ref={titleInput}
            type="text"
            name={"title"}
            placeholder="제목을 입력하세요."
            onChange={titleChangeHandler}
            value={Title}
            style={{ width: "230px" }}
          />
          <br />
          <br />
          {/*<ImgUpload />*/}

          <label>내용</label>
          <textarea
            ref={bodyInput}
            name="content"
            cols="30"
            rows="10"
            placeholder={"내용을 입력하세요."}
            onChange={bodyChangeHandler}
            value={Body}
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
