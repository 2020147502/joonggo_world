function GroupArea() {
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
                <img src="img/중고나라이모티콘.png" alt="중고나라 이모티콘" />
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

export default GroupArea;