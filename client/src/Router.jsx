import { Route, Routes } from "react-router-dom";

import Write from "./pages/Write";
import BoardList from "./pages/BoardList";
import BoardDetails from "./pages/BoardDetails";
import FixWrite from "./pages/FixWrite";
import Login from "./pages/Login";
import MainArea from "./components/MainArea";
import Mypage from "./pages/Mypage";
import SignUp from "./pages/SignUp";
import AuthRoute from "./AuthRoute";
import CheckBox from "./components/board/CheckBox";

function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<BoardList />} />
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
        <Route path="/board/write" element={<Write />} />
        <Route path="/board/item/:productId" element={<BoardDetails />} />
        <Route path="/board/fix/:productId" element={<FixWrite />} />
      </Routes>
    </>
  );
}

export default Router;
