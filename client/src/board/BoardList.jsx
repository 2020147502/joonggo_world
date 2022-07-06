import BoardItem from "./BoardItem.jsx";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Axios from "axios";

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

const Table = styled.div`
  table {
    width: 100%;
    border: 1px solid #444444;
    border-collapse: collapse;
  }
  th,
  td {
    border: 1px solid #444444;
    padding: 10px;
  }
`;

const BoardList = () => {
  const [Info, setInfo] = useState([]);

  useEffect(() => {
    Axios.get("/api/board/index").then((response) => {
      if (response.data.success) {
        alert("잘 가져왔습니다.");
        console.log(response.data[0]);
        setInfo(response.data[0]);
      } else {
        alert("실패하였습니다.");
      }
    });
  }, []);

  return (
    <Container>
      <div>
        <h1>전체글보기</h1>
        <h3>n개의 일기가 있습니다.</h3>

        <div>
          <Table>
            <thead>
              <tr>
                <th>카테고리</th>
                <th>제목</th>
                <th>작성자</th>
                <th>날짜</th>
                <th>조회수</th>
              </tr>
            </thead>

            <tbody>
              {Info.map((x) => {
                <tr>
                  <td>{x.product_type}</td>
                  <td>{x.title}</td>
                  <td>{}</td>
                  <td>{}</td>
                  <td>{}</td>
                </tr>;
              })}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};
BoardList.defaultProps = {
  boardList: [],
};

export default BoardList;
