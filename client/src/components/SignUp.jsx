import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import styled from "styled-components";
import { fetchSignUp } from "../api";

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

const Label = styled.button`
  margin: 30px;
`;

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();
  const mutation = useMutation(fetchSignUp);
  const onValid = (data) => {
    if (data.password !== data.confirmPassword) {
      setError(
        "confirmPassword",
        { message: "비밀번호가 일치하지 않습니다." },
        { shouldFocus: true }
      );
    }
    mutation.mutate(data);
  };

  return (
    <Container>
      <h1>sign up</h1>
      <form onSubmit={handleSubmit(onValid)}>
        <label htmlFor="email">이메일</label>
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
        <label htmlFor="username">이름</label>
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
        <label htmlFor="password">비밀번호</label>
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
        <label htmlFor="confirmPassword">비밀번호 재확인</label>
        <Input
          id="confirmPassword"
          {...register("confirmPassword", {
            required: "비밀번호 확인은 필수값입니다.",
          })}
        />
        <span>{errors?.confirmPassword?.message}</span>
        <SubmitBtn>가입하기</SubmitBtn>
      </form>
    </Container>
  );
}

export default SignUp;
