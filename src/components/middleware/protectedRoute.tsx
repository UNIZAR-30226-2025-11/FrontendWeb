// components/ProtectedRoute.tsx
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext"; // Adjust the import path
import { routes } from "../../utils/constants";

export const ProtectedLogin = ({ children }: { children: React.ReactNode }) => {
  const userContext = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Wait for user context to be resolved (either logged in or definitely not logged in)
    console.log("ProtectedLogin: ", userContext.user, userContext.isLoading);
    if (userContext.isLoading) {
      return;
    }
    
    setIsLoading(false);
    
    if (userContext.user !== undefined) {
      navigate(routes.gamemenu);
    }
  }, [userContext.user, userContext.isLoading, navigate]);

  // Show nothing during the initial loading phase
  if (isLoading) {
    return null; // Or a loading spinner if preferred
  }

  return children;
};

export const ProtectedNotLogin = ({ children }: { children: React.ReactNode }) => {
  const userContext = useUser();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {

    if (userContext.isLoading) {
      return; // Wait for loading to finish
    }

    setIsLoading(false);

    if (userContext.user === undefined) {
      navigate(routes.home);
    }
  }, [userContext.user, userContext.isLoading, navigate]);

  if (isLoading) {
    return null; // Or a loading spinner if preferred
  }

  return children;
}
