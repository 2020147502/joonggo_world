import BoardItem from "./BoardItem.jsx";
import React, { useState, useEffect } from "react";
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


const BoardList = ({ onEdit, onDelete, boardList }) => {
  return (
    <Container>
    <div>
      <h1>전체글보기</h1>
      <h3>{boardList.length}개의 일기가 있습니다.</h3>
      <div>
        {boardList.map((it) => (
          <BoardItem
            key={it.id}
            {...it}
            onDelete={onDelete}
            onEdit = {onEdit}
          ></BoardItem>
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
