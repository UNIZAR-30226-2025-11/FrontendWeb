import React, { createContext, useContext, useState, useEffect } from "react";
import { UserJSON } from "../api/entities";
import { SERVER } from "../utils/config";
import { routesRequest } from "../utils/constants";
// Import any necessary API functions

export interface UserContextType {
  user: UserJSON | undefined;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserJSON | undefined>>;
  refreshUser: () => Promise<void>; // Added refreshUser method
}

const UserContext = createContext<UserContextType>({
  user: undefined,
  isLoading: true,
  setUser: () => {},
  refreshUser: async () => {}, // Default implementation
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserJSON | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  // Create a reusable function to fetch user data
  const fetchUserData = async () => {
    try {
      const response = await fetch(SERVER + routesRequest.user, {
        method: 'GET',
        credentials: 'include', // Send cookies with the request
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
        return data;
      } else {
        setUser(undefined);
        return undefined;
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      return undefined;
    }
  };

  // Function to refresh user data
  const refreshUser = async () => {
    try {
      await fetchUserData();
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };

  useEffect(() => {
    // Attempt to fetch the user data when the app loads
    const initialize = async () => {
      try {
        await fetchUserData();
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);