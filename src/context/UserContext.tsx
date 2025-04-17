import React, { createContext, useContext, useState, useEffect } from "react";
import { UserJSON } from "../api/entities";
import { SERVER } from "../utils/config";
import { routesRequest } from "../utils/constants";
import { fetchUser } from "../services/apiService";
// Import any necessary API functions

export interface UserContextType {
  user: UserJSON | undefined;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserJSON | undefined>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType>({
  user: undefined,
  isLoading: true,
  setUser: () => {},
  setIsLoading: () => {}
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserJSON | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUser(setUser, setIsLoading);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);