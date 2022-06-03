import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchAuth } from "../api";


const Container = styled.div`
  height: 80px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
`;

const Logo = styled.div``;

const LoginBtn = styled.button``;



function Header() {
  const {data:user} = useQuery("auth", fetchAuth);
  const isLogin = localStorage.getItem("isLogin");
  return(
        <Container>
          <Link to="/">
            <Logo>중고마켓</Logo>
          </Link>
          {user?.isAuth && isLogin ? (            
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