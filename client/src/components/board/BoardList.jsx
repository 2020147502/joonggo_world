import BoardDetails from "./BoardDetails.jsx";
import BoardEach from "./BoardEach.jsx";
import Loader from "./Loader.jsx";

import { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Axios from "axios";
import { Link } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  max-width: 800px;
  margin: 0px auto;

  h1 {
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 800;
    text-align: left;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  hr {
    background-color: black;
  }
`;

const Table = styled.table`
  max-width: 800px;
  margin: 0px auto;
  width: 100%;
  //border: 1px solid #444444;
  //border-collapse: collapse;
  //border-radius: 100px;
  body {
    padding: 1.5em;
    background: #f5f5f5;
  }

  table {
    border: 1px #a39485 solid;
    font-size: 0.9em;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25);
    width: 100%;
    border-collapse: collapse;
    border-radius: 100px;
    overflow: hidden;
  }

  th {
    text-align: left;
  }

  thead {
    font-weight: bold;
    color: #fff;
    background: #73685d;
  }

  td,
  th {
    padding: 1em 0.5em;
    vertical-align: middle;
  }

  td {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    background: #fff;
  }

  a {
    color: #73685d;
  }

  @media all and (max-width: 768px) {
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    th {
      text-align: right;
    }

    table {
      position: relative;
      padding-bottom: 0;
      border: none;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }

    thead {
      float: left;
      white-space: nowrap;
    }

    tbody {
      overflow-x: auto;
      overflow-y: hidden;
      position: relative;
      white-space: nowrap;
    }

    tr {
      display: inline-block;
      vertical-align: top;
    }

    th {
      border-bottom: 1px solid #a39485;
    }

    td {
      border-bottom: 1px solid #e5e5e5;
    }
  }
`;

const BoardList = () => {
  const [Info, setInfo] = useState([]);
  const body = {
    limit: 10,
  };

  useEffect(() => {
    Axios.post("/api/board/index", body).then((response) => {
      console.log(response);
      if (response.data.success) {
        setInfo(response.data.productInfo);
      } else {
        alert("실패하였습니다.");
      }
    });
  }, []);

  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemLists, setItemLists] = useState([1]);

  useEffect(() => {
    // console.log(itemLists);
  }, [itemLists]);

  const getMoreItem = async () => {
    setIsLoaded(true);
    Axios.post("/api/board/index", body).then((response) => {
      console.log(response);
      if (response.data.success) {
        console.log("잘 가져왔습니다.");
        setInfo(response.data.productInfo);
      } else {
        alert("실패하였습니다.");
      }
    });
    try {
      body.limit += 10;
    } catch (err) {}
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoaded(false);
  };

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <>
      <Container>
        <h1>전체글보기</h1>
        <br />
        <hr />
      </Container>

      <Table>
        <thead>
          <tr>
            <th>카테고리</th>
            <th>제품명</th>
            <th>가격</th>
            <th>작성자</th>
            <th>날짜</th>
            <th>조회수</th>
          </tr>
        </thead>

        <tbody>
          {Info.map((x) => {
            return <BoardEach {...x} />;
          })}
        </tbody>
      </Table>

      <div ref={setTarget} className="Target-Element">
        {isLoaded && <Loader />}
      </div>
    </>
  );
};
BoardList.defaultProps = {
  boardList: [],
};

export default BoardList;
