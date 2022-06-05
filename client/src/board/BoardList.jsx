import BoardItem from "./BoardItem.jsx";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

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

const BoardList = ({ boardList }) => {
  return (
    <Container>
      <div>
        <h1>전체글보기</h1>
        <h3>{boardList.length}개의 일기가 있습니다.</h3>
        <div>
          <span>제목 </span>
          <span>작성자 </span>
          <span>작성일 </span>
          <span>추천수 </span>
        </div>
        <div>
          {boardList.map((it) => (
            <BoardItem key={it.id} {...it}></BoardItem>
          ))}
        </div>
      </div>
    </Container>
  );
};
BoardList.defaultProps = {
  boardList: [],
};

export default BoardList;
