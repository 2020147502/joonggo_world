import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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


const Write = ({ onCreate }) => {
  const [state, setState] = useState({
    title: "",
    content: "",
  });
  const titleInput = useRef();
  const contentInput = useRef();

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (state.title.length < 1) {
      titleInput.current.focus();
      return;
    }
    if (state.content.length < 1) {
      contentInput.current.focus();
      return;
    }

    onCreate(state.title, state.content);
    alert("등록이 완료되었습니다.");
    setState({
      title: "",
      content: "",
    });
  };

  return (
    <Container>
    <div className="Write">
      <h1>카페 글쓰기</h1>
      <div>
        <input
          ref={titleInput}
          type="text"
          name={"title"}
          placeholder="제목"
          onChange={handleChangeState}
          value={state.title}
        />
        <br />
        <textarea
          ref={contentInput}
          name="content"
          cols="30"
          rows="10"
          onChange={handleChangeState}
          value={state.content}
        ></textarea>
      </div>
      <Link to={"/board/list"}>
        <button className="submit-button" onClick={handleSubmit}>
          입력
        </button>
      </Link>
    </div>
    </Container>
  );
};

export default Write;
