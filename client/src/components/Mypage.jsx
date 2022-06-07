import { useQueryClient, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchLogout } from "../api";

const LogoutBtn = styled.button``;

function Mypage() {
  const isLogout = useQuery("logout", fetchLogout);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleLogout = () => {
    if(isLogout.status) {
      console.log("logout!")
      navigate("/")
      queryClient.invalidateQueries("auth") 
    }
  };
  return (
    <>
      <h1>hello, </h1>
      <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
    </>
  )
}

export default Mypage;