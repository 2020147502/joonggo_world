import BoardItem from "./BoardItem.jsx";
import React, { useState, useEffect } from "react";

const BoardList = ({ onDelete, boardList }) => {
  return (
    <div>
      <h1>전체글보기</h1>
      <h3>{boardList.length}개의 일기가 있습니다.</h3>
      <div>
        {boardList.map((element) => (
          <BoardItem
            key={element.id}
            {...element}
            onDelete={onDelete}
          ></BoardItem>
        ))}
      </div>
    </div>
  );
};
BoardList.defaultProps = {
  boardList: [],
};

export default BoardList;
