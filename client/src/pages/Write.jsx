import styled from "styled-components";

import ImgUpload from "../components/board/ImgUpload";
import Editor from "../components/board/Editor";

const Write = () => {
  const data = {
    title: "",
    body: "",
    product_type: "default",
    price: 0,
    // Images: [],
  };

  return (
    <>
      <Editor
        data={data}
        isEdit={false}
        headerText={"카페 글쓰기"}
        ImgUpload={<ImgUpload />}
      />
    </>
  );
};

export default Write;
