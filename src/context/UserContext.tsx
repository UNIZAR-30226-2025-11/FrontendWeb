import React, { createContext, useContext, useState, useEffect } from "react";
import { UserJSON } from "../api/entities";
import { SERVER } from "../utils/config";
import { routesRequest } from "../utils/constants";
// Import any necessary API functions

export interface UserContextType {
  user: UserJSON | undefined;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserJSON | undefined>>;
  // Add any other user-related functions here
}

const UserContext = createContext<UserContextType>({
  user: undefined,
  isLoading: true,
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserJSON | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Attempt to fetch the user data when the app loads
    const fetchUser = async () => {
      try {
        const response = await fetch(SERVER + routesRequest.user, {
          method: 'GET',
          credentials: 'include', // Send cookies with the request
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setUser(undefined);
        }
      } catch (error) {
        console.error("Failed to fetch user:");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);