import {Link} from "react-router-dom"
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NaverGNB() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <a href="https://www.naver.com/">
        <img
          src="https://ssl.pstatic.net/static/cafe/icon_naver_190423.png"
          width="52"
          alt="NAVER"
        />
      </a>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: "10px",
        }}
      >
        <div>
          <i className="fa-solid fa-grip-lines-vertical"></i>
        </div>
        <div>
          <a href="">이웃</a>
          <i className="fa-solid fa-grip-lines-vertical"></i>
        </div>
        <div>
          <a href="">
            가입카페
            <i className="fa-solid fa-caret-down"></i>
          </a>
          <i className="fa-solid fa-grip-lines-vertical"></i>
        </div>
        <div>
          <a href="">새글</a>
          <i className="fa-solid fa-grip-lines-vertical"></i>
        </div>
        <div>
          <a href="">내소식</a>
          <i className="fa-solid fa-grip-lines-vertical"></i>
        </div>
        <div>
          <a href="">채팅</a>
          <i className="fa-solid fa-grip-lines-vertical"></i>
        </div>
        <div>
          <i className="fa-solid fa-grip-lines-vertical"></i>
        </div>
        <div>
          <a href="">
            <i className="fa-solid fa-bars"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NaverGNB;