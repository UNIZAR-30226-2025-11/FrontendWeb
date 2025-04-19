import React, { createContext, useContext, useState, useEffect } from "react";
import { UserJSON } from "../api/entities";
import { fetchUser } from "../services/apiService"; // Adjust the import path as necessary
// Import any necessary API functions

export interface UserContextType {
  user: UserJSON | undefined;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserJSON | undefined>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  refreshUser: () => Promise<void>; // Added refreshUser method
}

const UserContext = createContext<UserContextType>({
  user: undefined,
  isLoading: true,
  setUser: () => {},
  setIsLoading: () => {},
  refreshUser: async () => {}, // Default implementation
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
    <UserContext.Provider value={{ user, isLoading, setUser, setIsLoading, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);