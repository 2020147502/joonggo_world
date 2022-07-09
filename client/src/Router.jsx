import { Route, Routes } from "react-router-dom";

import Board from "./components/board/Board";
import Write from "./components/board/Write";
import BoardList from "./components/board/BoardList";
import BoardItem from "./components/board/BoardItem";
import FixWrite from "./components/board/FixWrite";
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
        <Route path="/board/item/:productId" element={<BoardItem />} />
        <Route path="/board/fix/:productId" element={<FixWrite />} />
      </Routes>
    </>
  );
}

export default Router;
