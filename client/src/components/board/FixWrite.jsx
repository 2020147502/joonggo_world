import styled from "styled-components";
import { useParams } from "react-router-dom";

import ImgUpload from "./ImgUpload";
import Editor from "./Editor";

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
        ImgUpload={<ImgUpload />}
      />
    </>
  );
};

export default FixWrite;
