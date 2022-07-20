import styled from "styled-components";
import { useParams } from "react-router-dom";

import ImgUpload from "../components/board/ImgUpload";
import Editor from "../components/board/Editor";

const FixWrite = () => {
  const data = {};
  const { productId } = useParams();

  return (
    <>
      <Editor
        productId={productId}
        data={data}
        isEdit={true}
        headerText={"수정하기"}
      />
    </>
  );
};

export default FixWrite;
