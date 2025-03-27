// components/ProtectedRoute.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext"; // Adjust the import path
import { routes } from "../utils/constants";

export const ProtectedLogin = ({ children }: { children: React.ReactNode }) => {
  const userContext = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (userContext.user !== undefined) {
      navigate(routes.gamemenu);
    }
  }, [userContext.user, navigate]);

  return children;
};

export const ProtectedNotLogin = ({ children }: { children: React.ReactNode }) => {
  const userContext = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (userContext.user === undefined) {
      navigate(routes.home);
    }
  }, [userContext.user, navigate]);

  return children;
}
