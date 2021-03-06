import { Checkbox, Card } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid black;
  padding: 10px;
  background-color: #d3d3d3;
  margin: 20px 40px;
`;

const CheckBox = ({ handleChange }) => {
  return (
    <Container>
      <h5>카테고리</h5>
      <hr />
      <input
        className="구매"
        defaultChecked
        type="checkbox"
        onChange={handleChange}
      />
      <span>구매</span>
      <input
        className="판매"
        defaultChecked
        type="checkbox"
        onChange={handleChange}
      />
      <span>판매</span>
    </Container>
  );
};

export default CheckBox;
