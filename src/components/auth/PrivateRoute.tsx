import { Navigate } from "react-router-dom";
import { ReactElement } from "react";

interface PrivateRouteProps {
  children: ReactElement;
}

const PrivateRoute = ({ children }: PrivateRouteProps): ReactElement => {
  const isAuthenticated = !!localStorage.getItem("accessToken");

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
