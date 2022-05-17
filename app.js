const NaverGNB = () => {
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
          <a href="https://section.cafe.naver.com/ca-fe/">카페홈</a>
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
          <a href="">로그인</a>
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

const FrontImg = () => {
  const updateMoveMenu = (e) => {
    e.preventDefault();
  };
  return (
    <a href="" onClick="updateMoveMenu()">
      <img src="/jn_cafe_skin.png" alt="중고나라" style={{ width: "100%" }} />
    </a>
  );
};

const GroupArea = () => {
  return(
    <div>

    </div>;
  )
};

const App = () => {
  return (
    <div>
      <NaverGNB />
      <FrontImg />
      <div></div>
    </div>
  );
};

const 여기다가그려 = document.querySelector("#app");

ReactDOM.render(<App />, 여기다가그려);
