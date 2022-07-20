import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useQueryClient, useMutation } from "react-query";
import { fetchLogin } from "../api";
import { useNavigate } from "react-router-dom";



const FormBox = styled.div`
  display: flex;
  justify-content: center;
  width: 50%;
  form{
    margin-top: 100px;
    max-width: 440px;
    display: flex;
    flex-direction: column;
    #password {
    margin-top: 10px;
    }
  }
  h1 {
    font-size: 36px;
    font-weight: 600;
    line-height: 40px;
    text-align: left;
    margin-bottom: 50px;
    color: #5b50b4;
  }
  span{
    text-align: center;
  }
  span:nth-child(9) {
    margin-top: 40px;
  }
`;

const Box = styled.div`
	position: absolute;
  display: flex;
  justify-content: center;
	top: 0;
	left: 50%;
	width: 50%;
	height: 100%;
	overflow: hidden;
  background-image: linear-gradient(19deg, #5b50b4, #1d193b);
	z-index: 100;
  img {
    width: 35vw;
  }
`;

const Input = styled.input`
  border-style: none;
  height: 50px;
  border: solid 1px #707070;
  border-radius: 20px;
  padding: 0px 20px;
  font-size: 16px;
  &:focus {
    outline-color: #5b50b4;
  }
`;

const AutoLogin = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Button = styled.button`
  width: 440px;
  height: 50px;
  border-radius: 20px;
  border: solid 1px #5b50b4;
  background-color: #5b50b4;
  font-family: Roboto;
  font-size: 20px;
  text-align: center;
  color: white;
  margin-top: 20px;
  margin-bottom: 50px;
`;

const Hr = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  color: #707070;
  span{
    width: 100%;
    border-bottom: solid 1px #707070;
  }
`;

const SocialLogin = styled.div`
  width: 440px;
  height: 48px;
  border-radius: 20px;
  border: solid 1px #707070;
  font-family: Roboto;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  color: #707070;
  margin-top: 50px;
  margin-bottom: 80px;
  img {
    width: 30px;
    height: 30px;
    margin-right: 18px;
  }
`;

const SignUpBtn = styled.a`
  margin-left: 20px;
  text-decoration: none;
`;


function Login() {
  const { register, handleSubmit, formState:{errors} } = useForm();
  const mutation = useMutation(fetchLogin)
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const onValid = (data) => {
    mutation
    .mutateAsync(data)
    .then((res)=>{
      if(res.loginSuccess) {
        localStorage.setItem("userId",res.userId)
        navigate("/")
        queryClient.invalidateQueries("auth")
      } else {
        alert(res.message)
      }
    })
  }
  return(
    <>
      <FormBox>
        <form onSubmit={handleSubmit(onValid)}>
          <h1>안녕하세요,<br />캠퍼스마켓입니다.</h1>
          <Input id="email" {...register("email", {required:true})} placeholder="email@campus.com"></Input>
          <Input id="password" type="password" {...register("password", {required:true})} placeholder="password"></Input>
          <AutoLogin>
            <Input id="autoLogin" type="checkbox" {...register("autoLogin")}></Input>
            <label htmlFor="autoLogin">자동로그인</label>
          </AutoLogin>
          <Button>로그인</Button>
          <Hr><span />or<span /></Hr>
          <SocialLogin>
            <img src="img/google.png" />
            구글로 로그인하기
          </SocialLogin>
          <span>
            <label>아직 계정이 없으신가요?</label>
            <SignUpBtn id ="signUp" href="/signup">회원가입</SignUpBtn>
          </span>
          <span>
            이메일/비밀번호 찾기
          </span>
        </form>
      </FormBox>
      <Box>
        <img src="img/illust.svg" art="캠퍼스마켓" />
      </Box>
    </>
  )
}

export default Login;