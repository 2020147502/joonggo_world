/* import styled from "styled-components";
import { useRef, useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import { fetchBoard } from "../api";

const BoardEach = (onEdit, onDelete, created_date, content, title, id) => {
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

  const [board, setBoard] = useState({});

  useEffect(() => {
    axios
      .get(``)
      .then((response) => {
        setBoard(response.data[0]);
      })
      .catch((err) => alert(err));
  }, []);

  const localContentInput = useRef();
  const [localContent, setLocalContent] = useState(content);

  const [isEdit, setIsEdit] = useState(false);
  const toggleIsEdit = () => setIsEdit(!isEdit);

  const handleDelete = () => {
    if (window.confirm("게시글을 정말 삭제하시겠습니까?")) onDelete(id);
  };

  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };

  const handleEdit = () => {
    if (localContent.length < 1) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm("글을 수정하시겠습니까?")) {
      onEdit(id, localContent);
      toggleIsEdit();
    }
  };

  return (
    <Container>
      <h1>{title}</h1>
      <span>{created_date}</span>
      <span>{content}</span>
      <div>
        {isEdit ? (
          <>
            <textarea
              ref={localContentInput}
              value={localContent}
              onChange={(e) => setLocalContent(e.target.value)}
            />
          </>
        ) : (
          <>{content}</>
        )}
      </div>

      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleDelete}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </Container>
  );
};

export default BoardEach;
 */