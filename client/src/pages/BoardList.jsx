import BoardDetails from "./BoardDetails.jsx";
import BoardEach from "../components/board/BoardEach.jsx";
import Loader from "../components/board/Loader.jsx";
import CheckBox from "../components/board/CheckBox.jsx";
import RadioBox from "../components/board/RadioBox.jsx";
import { categories, price } from "../components/board/Datas";

import { Grid } from "@mui/material";

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

const FilterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const BoardList = () => {
  ////////////////////////////////////////////////////////////////
  //// 게시글 받아오기
  const [Info, setInfo] = useState([]);

  //리스트 10개 받아서 게시판 리스트에 쏴줌
  const getProducts = (body) => {
    Axios.post("/api/board/index", body).then((response) => {
      if (response.data.success) {
        setInfo(response.data.productInfo);
      } else {
        alert("실패하였습니다.");
      }
    });
  };
  //조건에 따른 필터링
  const filterProducts = (body) => {
    Axios.post("/api/board/products", body).then((response) => {
      if (response.data.success) {
        console.log(response);
        setInfo(response.data.productInfo);
      } else {
        alert("실패하였습니다.");
      }
    });
  };
  //렌더링 될 때 위 함수
  useEffect(() => {
    let body = {
      limit: Limit,
      skip: Skip,
    };
    getProducts(body);
  }, []);
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////
  ////무한 스크롤
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemLists, setItemLists] = useState([1]);
  let body = {
    limit: 10,
  };
  // 새로운 리스트 10개 만들기
  const getMoreItem = async () => {
    setIsLoaded(true);
    getProducts(body);
    try {
      body.limit += 10;
    } catch (err) {}
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoaded(false);
  };

  //화면의 바닥을 감지->새로운 리스트10개 만들기 -콜백함수
  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };
  // 옵저버 생성 -> 콜백함수 실행
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
  ////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////
  ////필터기능
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(10);

  const [checked, setChecked] = useState([true, true]);
  const [filteredCategory, setFilteredCategory] = useState("");
  const [filteredPrice, setFilteredPrice] = useState([0, 1000000]);
  //필터 api 이용해서 필터 기능
  const handleChange = (e) => {
    let filteredBody = {
      skip: Skip,
      limit: Limit,
      price: filteredPrice,
      product_type: filteredCategory,
    };
    let body = {
      skip: Skip,
      limit: Limit,
    };

    if (!isNaN(e.target.value)) {
      setFilteredPrice([0, e.target.value]);
    } else {
      if (e.target.className == "구매") {
        checked[0] == true ? (checked[0] = false) : (checked[0] = true);
      } else if (e.target.className == "판매") {
        checked[1] == true ? (checked[1] = false) : (checked[1] = true);
      }
    }

    if (checked[0] === false && checked[1] === false) {
      console.log(checked);
      // setFilteredCategory(false);
      // getProducts(body);
      // console.log(checked);
      setInfo([]);
    } else if (checked[0] === true && checked[1] === true) {
      console.log(checked);
      getProducts(body);
    } else {
      console.log(checked[0], checked[1]);
      if (checked[0] === true) {
        // console.log(checked[0]);
        setFilteredCategory("구매");
      } else {
        // console.log(checked[1]);
        setFilteredCategory("판매");
      }
      console.log(filteredCategory);
      filterProducts(filteredBody);
    }
  };

  ////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////

  return (
    <>
      <Container>
        <h1>전체글보기</h1>
        <br />
        <hr />
      </Container>
      <FilterContainer>
        {/*구매 판매 선택 박스*/}
        <CheckBox handleChange={handleChange} />
        {/*가격 범위 선택 박스*/}
        <RadioBox handleChange={handleChange} />
      </FilterContainer>

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
            return <BoardEach key={x._id} {...x} />;
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
