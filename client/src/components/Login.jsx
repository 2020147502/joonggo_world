import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { fetchLogin } from "../api";


const Container = styled.div`
  form{
    display: flex;
    flex-direction: column;
  }
`;

const Input = styled.input``;

const Button = styled.button``;

const SocialLogin = styled.button``;

const SignUpBtn = styled.a``;


function Login() {
  const { register, handleSubmit, formState:{errors} } = useForm();
  const mutation = useMutation(fetchLogin);
  const onValid = (data) => {
    mutation.mutate(data)
  }
  return(
    <Container>
      <h1>안녕하세요,<br />중고나라입니다</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <Input {...register("email", {required:"이메일을 입력해주세요."})}></Input>
        <span>{errors?.email?.message}</span>
        <Input {...register("password", {required:"비밀번호를 입력해주세요"})}></Input>
        <span>{errors?.password?.message}</span>
        <span>
          <Input id="remember" type="checkbox"{...register("remember")}></Input>
          <label htmlFor="remember">비밀번호 저장하기</label>
        </span>
        <Button>로그인</Button>
        <hr />
        <SocialLogin>구글로 로그인하기</SocialLogin>
        <span>
          <label>아직 계정이 없으신가요?</label>
          <SignUpBtn id ="signUp" href="/">회원가입</SignUpBtn>
        </span>
      </form>
    </Container>
  )
}

export default Login;