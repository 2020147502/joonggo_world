import styled from "styled-components";


const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Modal = styled.div`
  position: fixed;
  top: 200px;
  width: 500px;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 30px;
  background-color: whitesmoke;
  box-shadow: 10px 10px 10px rgba(0,0,0,0.1);
  h1{
    font-size: 20px;
    margin-bottom: 20px;
  }
  div{
    margin-bottom: 28px;
    line-height: 20px;
  }
  button{
    width: 200px;
    height: 36px;
    border-radius: 10px;
    border: none;
    background-color: #5b50b4;
    font-family: Roboto;
    font-size: 16px;
    text-align: center;
    color: white;
    margin: 10px 0px;
    align-self: center;
  }
`;

const Input = styled.div`
  display: flex;
  margin: 0;
  input{
    width: 180px;
    height: 30px;
    border: none;
    background-color: transparent;
    border-bottom: solid 2px #5b50b4;
    margin-right: 10px;
    text-align: center;
    &:focus {
      outline: none;
    }
  }
  div{
    width: 60px;
    height: 26px;
    font-size: 14px;
    border: solid 2px #5b50b4;
    color: #5b50b4;
    margin-bottom: 0;
    border-radius: 8px;
    align-self: center;
    line-height: 26px;
  }
`;

function EmailAuthModal() {
  return(
    <Wrapper>
      <ModalOverlay />
      <Modal>
        <h1>이메일 인증</h1>
        <div>
          `입력한 이메일`로 인증메일을 전송했습니다.
          <br />인증번호 6자리를 입력해주세요.
        </div>
        <form>
          <Input>
            <input></input>
            <div>재전송</div>
          </Input>
          <button>인증번호 확인</button>
        </form>
      </Modal>
    </Wrapper>
  )
}

export default EmailAuthModal;