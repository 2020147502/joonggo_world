import { Route, Routes } from "react-router-dom";
import Board from "./board/Board";
import Login from "./components/Login";
import MainArea from "./components/MainArea";
import Mypage from "./components/Mypage";
import SignUp from "./components/SignUp"
import AuthRoute from "./AuthRoute";

function Router() {
  return(
    <>
{/*       <GroupArea />
      <Board /> */}
      <Routes>
        <Route path="/" element={<MainArea />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<AuthRoute><Mypage /></AuthRoute>} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </>
  )
}

export default Router;