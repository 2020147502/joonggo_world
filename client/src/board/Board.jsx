import { BrowserRouter, Route, Routes } from "react-router-dom";

import BoardList from "./BoardList";
import Write from "./Write";
import { useRef, useState } from "react";

function Board() {
  const [data, setData] = useState([]);

  const dataId = useRef(0);

  const onCreate = (title, content) => {
    const created_date = new Date().getTime();
    const newItem = {
      title,
      content,
      created_date,
      id: dataId.current,
    };
    dataId.current++;
    setData([newItem, ...data]);
  };

  const onDelete = (targetId) => {
    const newBoardList = data.filter((it) => it.id != targetId);
    setData(newBoardList);
  };

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  return (
    <Routes>
      <Route
        path="/board/list"
        element={
          <BoardList onEdit={onEdit} onDelete={onDelete} boardList={data} />
        }
      />
      <Route path="/board/write" element={<Write onCreate={onCreate} />} />
    </Routes>
  );
}

export default Board;
