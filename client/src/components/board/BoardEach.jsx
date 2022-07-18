import React from "react";
import { Link } from "react-router-dom";

const BoardEach = (props) => {
  return (
    <tr key={props._id}>
      <td>{props.product_type}</td>
      <td>
        <Link to={`/board/item/${props._id}`}>{props.title}</Link>
      </td>
      <td>{props.price}</td>
      <td>{props.author}</td>
      <td>{props.createdAt.substring(0, 10)}</td>
      <td>{props.views}</td>
    </tr>
  );
};

export default BoardEach;
