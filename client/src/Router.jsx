import { BrowserRouter, Route, Routes } from "react-router-dom";
import Board from "./board/Board";
import GroupArea from "./components/GroupArea";
import Header from "./components/Header";
import Login from "./components/Login";
import MainArea from "./components/MainArea";
import Mypage from "./components/Mypage";
import SignUp from "./components/SignUp"

function Router() {
  return(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Header />
{/*       <GroupArea />
      <Board /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainArea />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/board" element={<Board />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;