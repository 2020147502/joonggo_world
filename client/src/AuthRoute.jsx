import { useQuery } from "react-query";
import { Navigate } from "react-router-dom";
import { fetchAuth } from "./api";


function AuthRoute({ children }) {
const user = useQuery("auth",fetchAuth)
const savedUser = localStorage.getItem("userId")
  return (
    user.data?.isAuth && user.data?._id === savedUser? (
      children
    ) : (
      <Navigate to="/login" />
    )
  );
}

export default AuthRoute;

