import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type PrivatePageProps = {
  children: ReactNode;
};

const PrivatePage = ({ children }: PrivatePageProps) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default PrivatePage;
