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
  //// ????????? ????????????
  const [Info, setInfo] = useState([]);

  //????????? 10??? ????????? ????????? ???????????? ??????
  const getProducts = (body) => {
    Axios.post("/api/board/index", body).then((response) => {
      if (response.data.success) {
        setInfo(response.data.productInfo);
      } else {
        alert("?????????????????????.");
      }
    });
  };
  //????????? ?????? ?????????
  const filterProducts = (body) => {
    Axios.post("/api/board/products", body).then((response) => {
      if (response.data.success) {
        console.log(response);
        setInfo(response.data.productInfo);
      } else {
        alert("?????????????????????.");
      }
    });
  };
  //????????? ??? ??? ??? ??????
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
  ////?????? ?????????
  const [target, setTarget] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [itemLists, setItemLists] = useState([1]);
  let body = {
    limit: 10,
  };
  // ????????? ????????? 10??? ?????????
  const getMoreItem = async () => {
    setIsLoaded(true);
    getProducts(body);
    try {
      body.limit += 10;
    } catch (err) {}
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoaded(false);
  };

  //????????? ????????? ??????->????????? ?????????10??? ????????? -????????????
  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoaded) {
      observer.unobserve(entry.target);
      await getMoreItem();
      observer.observe(entry.target);
    }
  };
  // ????????? ?????? -> ???????????? ??????
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
  ////????????????
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(10);

  const [checked, setChecked] = useState([true, true]);
  const [filteredCategory, setFilteredCategory] = useState("");
  const [filteredPrice, setFilteredPrice] = useState([0, 1000000]);
  //?????? api ???????????? ?????? ??????
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
      if (e.target.className == "??????") {
        checked[0] == true ? (checked[0] = false) : (checked[0] = true);
      } else if (e.target.className == "??????") {
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
        setFilteredCategory("??????");
      } else {
        // console.log(checked[1]);
        setFilteredCategory("??????");
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
        <h1>???????????????</h1>
        <br />
        <hr />
      </Container>
      <FilterContainer>
        {/*?????? ?????? ?????? ??????*/}
        <CheckBox handleChange={handleChange} />
        {/*?????? ?????? ?????? ??????*/}
        <RadioBox handleChange={handleChange} />
      </FilterContainer>

      <Table>
        <thead>
          <tr>
            <th>????????????</th>
            <th>?????????</th>
            <th>??????</th>
            <th>?????????</th>
            <th>??????</th>
            <th>?????????</th>
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
