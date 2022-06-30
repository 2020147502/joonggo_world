import { useQueryClient, useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchLogout } from "../api";

const LogoutBtn = styled.button``;

function Mypage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const mutation = useMutation(fetchLogout)
  const handleLogout = () => {
    mutation
    .mutateAsync()
    .then((res)=>{
        if(res.success) {
        localStorage.removeItem("userId")
        navigate("/")
        queryClient.invalidateQueries("auth")
      } else {
        alert(res.message)
      }
    })
  }

  return (
    <>
      <h1>hello, </h1>
      <LogoutBtn onClick={handleLogout}>로그아웃</LogoutBtn>
    </>
  )
}

export default Mypage;