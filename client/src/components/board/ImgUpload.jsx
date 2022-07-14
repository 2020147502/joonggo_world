import React, { useState } from "react";
import Dropzone from "react-dropzone";
import Axios from "axios";
import styled from "styled-components";

const Container = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const ImgUpload = () => {
  const [images, setImages] = useState([]);

  const handleDrop = (files) => {
    let formData = new FormData();
    console.log(files);
    formData.append("file", files[0]);

    //이미지를 올리기 위해서는 아래와 같은 형식의 config가 필요
    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    Axios.post("/api/borad/image", formData, config).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setImages([...images, response.data.filePath]);
      } else {
        alert("파일을 저장하는데 실패했습니다.");
      }
    });
  };
  return (
    <div>
      <Dropzone onDrop={ImgUpload}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <Container
              style={{
                width: 200,
                height: 160,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "1px solid rgba(0, 0, 0, 0.1)",
              }}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <p
                style={{
                  fontSize: "30px",
                }}
              >
                +
              </p>
            </Container>
          </section>
        )}
      </Dropzone>
      <div>
        {images.map((img, index) => (
          <div key={index}>
            <img src={`localhost:5000/${img}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImgUpload;
