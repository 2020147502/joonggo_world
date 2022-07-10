import styled from "styled-components";

import ImgUpload from "./ImgUpload";
import Editor from "./Editor";

const Write = () => {
  const data = {
    title: "",
    body: "",
    product_type: "판매",
    product_catagory: "생략",

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
