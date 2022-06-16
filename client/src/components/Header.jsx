import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchAuth } from "../api";


const Container = styled.div`
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  a{
    text-decoration: none;
  }
`;

const Logo = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Impact;
  font-size: 40px;
  line-height: 80%;
  text-align: left;
  margin-left: 30px;
  span:first-child {
    color: #5b50b4;
  }
  span:last-child {
    color: #707070;
  }
`;

const LoginBtn = styled.button`
  width: 80px;
  height: 30px;
  margin-right: 30px;
  border: none;
  border-radius: 10px;
  background-color:#5b50b4;
  color: white; 
`;



function Header() {
  const {data:user} = useQuery("auth", fetchAuth);
  return(
        <Container>
          <Link to="/">
            <Logo>
              <span>CAMPUS</span>
              <span>MARKET</span>
            </Logo>
          </Link>
          {user?.isAuth ? (            
            <Link to="/Mypage">
              <LoginBtn>마이페이지</LoginBtn>
            </Link>
            ) : (
            <Link to="/login">
              <LoginBtn>로그인</LoginBtn>
            </Link>
            )}
        </Container>
  )
}
export default Header;