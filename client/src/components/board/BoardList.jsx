import BoardItem from "./BoardItem.jsx";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Axios from "axios";
import { Link } from "react-router-dom";

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

const Table = styled.table`
  max-width: 800px;
  margin: 0px auto;
  width: 100%;
  border: 1px solid #444444;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #444444;
    padding: 10px;
  }
`;

const BoardList = () => {
  const [Info, setInfo] = useState([]);

  useEffect(() => {
    Axios.post("/api/board/index").then((response) => {
      if (response.data.success) {
        alert("잘 가져왔습니다.");
        setInfo(response.data.productInfo);
      } else {
        alert("실패하였습니다.");
      }
    });
  }, []);

  return (
    <>
      <Container>
        <h1>전체글보기</h1>
        <h3>{Info.length}개의 일기가 있습니다.</h3>
      </Container>

      <Table>
        <thead>
          <tr>
            <th>카테고리</th>
            <th>제품명</th>
            <th>작성자</th>
            <th>날짜</th>
            <th>조회수</th>
          </tr>
        </thead>

        <tbody>
          {Info.map((x) => {
            return (
              <tr key={x._id}>
                <td>{x.product_type}</td>
                <td>
                  <Link to={`/board/item/${x._id}`}>{x.title}</Link>
                </td>
                <td>{x.author}</td>
                <td>{x.updatedAt.substring(0, 10)}</td>
                <td>{x.views}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
BoardList.defaultProps = {
  boardList: [],
};

export default BoardList;
