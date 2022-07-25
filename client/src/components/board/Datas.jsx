import React from "react";

export const categories = [
  {
    _id: 1,
    name: "구매",
  },
  {
    _id: 2,
    name: "판매",
  },
];

export const price = [
  {
    _id: 1,
    name: "0원 ~ 10,000원",
    array: [0, 10000],
  },
  {
    _id: 2,
    name: "10,000원 ~ 30,000원",
    array: [10000, 30000],
  },
  {
    _id: 3,
    name: "30,000원 ~ 60,000원",
    array: [30000, 60000],
  },
  {
    _id: 4,
    name: "50,000원 ~ 100,000원",
    array: [50000, 100000],
  },
  {
    _id: 5,
    name: "100,000원 이상",
    array: [100000, 999999],
  },
];
