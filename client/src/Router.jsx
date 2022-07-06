import { Route, Routes } from "react-router-dom";
import Board from "./board/Board";
import Write from "./board/Write";
import BoardList from "./board/BoardList";

import Login from "./components/Login";
import MainArea from "./components/MainArea";
import Mypage from "./components/Mypage";
import SignUp from "./components/SignUp";
import AuthRoute from "./AuthRoute";

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainArea />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/mypage"
          element={
            <AuthRoute>
              <Mypage />
            </AuthRoute>
          }
        />
        <Route path="/board" element={<Board />} />
        <Route path="/board/write" element={<Write />} />
        <Route path="/board/list" element={<BoardList />} />
      </Routes>
    </>
  );
}

export default Router;
