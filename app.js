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
  return (
    <div>
      <div className="GroupArea-CafeInfo">
        <ul className="GroupArea-CafeInfo-ActionTab">
          <li>
            <p>카페정보</p>
          </li>
          <li>
            <a href="">
              <p>나의활동</p>
            </a>
          </li>
        </ul>
        <div className="GroupArea-CafeInfo-BoxG">
          <div className="GroupArea-CafeInfo-BoxG-data1">
            <ul>
              <li>
                <img src="/중고나라이모티콘.png" alt="중고나라 이모티콘" />
              </li>
              <li>
                <div>
                  <span>매니저</span>
                  <a href="">운영자</a>
                </div>
                <p>2003.12.10.</p>
              </li>
            </ul>
          </div>
          <div className="GroupArea-CafeInfo-BoxG-data2">
            <div>
              <i className="fa-solid fa-user"></i>
              <span>1(멤버수)</span>
            </div>
          </div>
        </div>
        <div className="GroupArea-CafeInfo-Join">
          <a href="">
            <p>카페 가입하기</p>
          </a>
        </div>
        <div className="GroupArea-CafeInfo-Chat">
          <a href="">
            <p>카페 채팅</p>
          </a>
        </div>
      </div>

      <div className="GroupArea-CafeSearch">
        <form>
          <input type="text" />
          <button>검색</button>
        </form>
      </div>
      <div className="GroupArea-CafeMenu">
        <div>
          <i className="fa-solid fa-file-lines"></i>
          <a href="">전체글보기</a>
          <span>1(글수)</span>
        </div>
        <ul>
          <li>
            <i className="fa-solid fa-file-lines"></i>
            <a href="">식품</a>
            <i className="fa-solid fa-n"></i>
          </li>

          <li>
            <i className="fa-solid fa-file-lines"></i>
            <a href="">중고폰/모바일</a>
            <i className="fa-solid fa-n"></i>
          </li>

          <li>
            <i className="fa-solid fa-file-lines"></i>
            <a href="">컴퓨터</a>
            <i className="fa-solid fa-n"></i>
          </li>
        </ul>
      </div>
    </div>
  );
};

const MainArea = () => {
  return (
    <div>
      <div className="MainArea-Advertisement"></div>
      <div className="MainArea-BasisElement">
        <div className="MainArea-CafeData"></div>
        <div className="MainArea-WidgetArea"></div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <NaverGNB />
      <FrontImg />
      <div>
        <GroupArea />
        <MainArea />
      </div>
    </div>
  );
};

const 여기다가그려 = document.querySelector("#app");

ReactDOM.render(<App />, 여기다가그려);
