import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { fetchConfirmEmail, fetchSignUp } from "../api";
import EmailAuthModal from "../components/EmailAuthModal";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const mutationSignUp = useMutation(fetchSignUp);
  const mutationConfirmEmail = useMutation(fetchConfirmEmail);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const onValid = (data) => {
    if (data.password !== data.confirmPassword) {
      setError(
        "confirmPassword",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    } else {
      mutationConfirmEmail.mutateAsync(data).then((res) => {
        console.log(res);
        // 학교 이메일이면
        if (res.success) {
          // 인증메일 보내는 시간동안 로딩 후 모달 열기
          //모달열어서, 인증번호 입력받기
          setShowModal(true);
        }
        // 학교 이메일이 아니면
        else if (!res.success) {
          alert(res.message);
        }
      });

      // 인증번호 전송 (인증)
      // 모달띄워서 입력받기
      // 입력받은 인증번호와 보낸 인증번호가 일치하는지 확인(인증)
      // 사용중인 이메일은 아닌가? (가입)
      // 가입성공(가입)

      /*       mutationSignUp
      .mutateAsync(data)
      .then ((res) => {     
          if(res.success) {
          alert("회원가입이 완료되었습니다.")
          navigate("/login")
        }
        else if(res.err?.code === 11000) {
          alert("이미 사용중인 이메일 입니다.")
        }
      }) */
    }
  };
  return (
    <Container>
      <h1>sign up</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <label htmlFor="email">Email</label>
        <Input
          id="email"
          {...register("email", {
            required: "이메일은 필수값입니다.",
            pattern: {
              value:
                /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
              message: "이메일 양식에 맞지 않습니다.",
            },
          })}
        />
        <span>{errors?.email?.message}</span>
        <label htmlFor="username">Username</label>
        <Input
          id="username"
          {...register("username", {
            required: "사용자이름은 필수값입니다.",
            minLength: {
              value: 2,
              message: "사용자이름은 2글자 이상입니다.",
            },
          })}
        />
        <span>{errors?.username?.message}</span>
        <label htmlFor="password">Password</label>
        <Input
          id="password"
          {...register("password", {
            required: "비밀번호는 필수값입니다.",
            minLength: {
              value: 8,
              message: "비밀번호는 8글자 이상입니다.",
            },
          })}
        />
        <span>{errors?.password?.message}</span>
        <label htmlFor="confirmPassword">Confirm password</label>
        <Input
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "비밀번호 확인은 필수값입니다.",
          })}
        />
        <span>{errors?.confirmPassword?.message}</span>
        <SubmitBtn>sign up</SubmitBtn>
      </form>
      {showModal ? <EmailAuthModal /> : null}
    </Container>
  );
}

export default SignUp;
