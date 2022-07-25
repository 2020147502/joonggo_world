import { Checkbox, Card, Slider } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";

import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid black;
  padding: 10px;
  background-color: #d3d3d3;
  margin: 20px 40px;
`;

const RadioBox = ({ handleChange }) => {
  return (
    <Container>
      <h5>가격</h5>
      <hr />
      <input
        type="range"
        step={10000}
        min="0"
        max="1000000"
        defaultValue="1000000"
        onChange={handleChange}
      />
    </Container>
  );
};

export default RadioBox;
