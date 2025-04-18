import React, { createContext, useContext, useState, useEffect } from "react";
import { UserJSON } from "../api/entities";
import { fetchUser } from "../services/apiService"; // Adjust the import path as necessary
// Import any necessary API functions

export interface UserContextType {
  user: UserJSON | undefined;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserJSON | undefined>>;
  refreshUser: () => Promise<void>; // Added refreshUser method
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserContext = createContext<UserContextType>({
  user: undefined,
  isLoading: true,
  setUser: () => {},
  refreshUser: async () => {}, // Default implementation
  setIsLoading: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserJSON | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  // Function to refresh user data
  const refreshUser = async () => {
    try {
      await fetchUser(setUser, setIsLoading);
    } catch (error) {
      console.error("Error refreshing user data:", error);
    }
  };

  useEffect(() => {
    // Attempt to fetch the user data when the app loads
    const initialize = async () => {
      try {
        await fetchUser(setUser, setIsLoading);
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, refreshUser, setIsLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);