import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchConfirmEmail, fetchSignUp } from "../api";


const Input = styled.input`
  width: 100%;
  height: 50px;
  border: solid 1px #d3d3d3;
  border-radius: 20px;
  outline: none;
  border-radius: 0px;
  line-height: 2.5rem;
  font-size: 1.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-top: 10px;
  margin-bottom: 20px;
  ::placeholder {
    color: #808080;
  }
`;

const Container = styled.div`
  max-width: 500px;
  margin: 0px auto;
  h1 {
    text-transform: uppercase;
    font-size: 50px;
    text-align: center;
  }
  form {
    display: flex;
    flex-direction: column;
  }
`;

const SubmitBtn = styled.button`
  width: 103%;
  height: 50px;
  border: solid 1px #5b50b4;
  background-color: #5b50b4;
  font-family: Roboto;
  font-size: 20px;
  text-align: center;
  color: white;
  margin-top: 20px;
  margin-bottom: 50px;
`;

function SignUp() {
  const { register, handleSubmit, formState: {errors}, setError } = useForm();
  const mutationSignUp = useMutation(fetchSignUp);
  const mutationConfirmEmail = useMutation(fetchConfirmEmail);
  const navigate = useNavigate();
  const onValid = (data) => {
    if(data.password !== data.confirmPassword) {
      setError("confirmPassword",
      {message:"비밀번호가 일치하지 않습니다."},
      {shouldFocus: true})
    }
    else {
      mutationConfirmEmail
      .mutateAsync(data)
      .then((res) => {
        console.log(res)
        }
      )
/*       mutationSignUp
      .mutateAsync(data)
      .then((res) => {     
        if(res.success) {
          alert("회원가입이 완료되었습니다.")
          navigate("/login")
        }
        else if(res.err?.code === 11000) {
          alert("이미 사용중인 이메일 입니다.")
        } */
    }
  }
  return(
    <Container>
      <h1>sign up</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <label htmlFor="email">Email</label>
        <Input id="email" {...register("email", {
          required:"이메일은 필수값입니다.",
          pattern: {
            value: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
            message:"이메일 양식에 맞지 않습니다."
          }
          })}
        />
        <span>{errors?.email?.message}</span>
        <label htmlFor="username">Username</label>
        <Input id="username" {...register("username", {
          required:"사용자이름은 필수값입니다.", 
          minLength: {
            value:2,
            message:"사용자이름은 2글자 이상입니다."
        }})} />
        <span>{errors?.username?.message}</span>
        <label htmlFor="password">Password</label>
        <Input id="password" {...register("password",{
          required:"비밀번호는 필수값입니다.",
          minLength: {
            value:8,
            message:"비밀번호는 8글자 이상입니다."
          }
        })} />
        <span>{errors?.password?.message}</span>
        <label htmlFor="confirmPassword">Confirm password</label>
        <Input id="confirmPassword" {...register("confirmPassword", {required:"비밀번호 확인은 필수값입니다."})} />
        <span>{errors?.confirmPassword?.message}</span>
        <SubmitBtn>sign up</SubmitBtn>
      </form>
    </Container>
  )
}

export default SignUp;