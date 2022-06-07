import { useRef, useState } from "react";
import { Link, Route } from "react-router-dom";

import styled from "styled-components";
import BoardEach from "./BoardEach";

const BoardItem = ({ onEdit, onDelete, title, content, created_date, id }) => {
  return (
    <div className="DiaryItem">
      <div>
        <Link to={`/board/${id}`}>
          <span>{title} </span>
        </Link>
        <span>작성자 (로그인 구현되면) </span>
        <span>{new Date(created_date).toLocaleString()}</span>
        <span>추천수 (추천 기능 구현되면)</span>
      </div>
    </div>
  );
};

export default BoardItem;
