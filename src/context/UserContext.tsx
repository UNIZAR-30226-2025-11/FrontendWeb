import { createContext, useContext, useEffect, useState } from 'react';
import { routesRequest } from '../utils/constants';
import { SERVER } from '../utils/config';
import React from 'react';

// Define the context type
export interface UserContextType {
  user: {
    username:string, 
    coins:number,
    games_played: number,
    games_won: number,
  } | undefined;
}

// Create a context with a default value
const UserContext = createContext<UserContextType | null>(null);

// Provider component to wrap around the app
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserContextType['user']>(undefined);

  useEffect(() => {
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
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access user context
export const useUser = () => 
{
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
