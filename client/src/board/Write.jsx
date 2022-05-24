import { useState, useRef } from "react";
import { Link } from "react-router-dom";

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
  );
};

export default Write;
