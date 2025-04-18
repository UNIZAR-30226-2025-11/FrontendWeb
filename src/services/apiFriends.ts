import { SERVER } from "../utils/config";
import { routesRequest } from "../utils/constants";

/**
 * Fetches the list of friends for the current user.
 * @returns Array of usernames (strings)
 */
export const fetchFriends = async (): Promise<string[]> => {
  const res = await fetch(SERVER + routesRequest.friends, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  if(data)
    return data.users.map((user: any) => user.username);
  else
    return [];
};

/**
 * Removes a friend from the user's friend list.
 * @param username The friend's username
 */
export const removeFriend = async (username: string): Promise<void> => {
    await fetch(SERVER + routesRequest.friends, {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        resp: { username },
      }),
    });
  };
  
  /**
   * Sends a friend request to the specified user.
   * @param username The username to send a request to
   */
  export const sendFriendRequest = async (username: string): Promise<void> => {
      const response = await fetch(SERVER + routesRequest.friends, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          resp: { username },
        }),
      });
    
      if (!response.ok) {
        throw new Error("Friend request failed");
      }
    };

/**
 * Fetches pending friend requests received by the current user.
 * @returns Array of usernames (strings)
 */
export const fetchFriendRequests = async (): Promise<string[]> => {
  const res = await fetch(SERVER + routesRequest.friendRequest, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();
  if(data)
    return data.users.map((user: any) => user.username);
  else
    return [];
};

/**
 * Accepts or rejects a friend request.
 * @param username The username of the requester
 * @param accept Whether the request is accepted (true) or rejected (false)
 */
export const respondToFriendRequest = async (username: string, accept: boolean): Promise<void> => {
  await fetch(SERVER + routesRequest.friendRequest, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      resp: { username, accept },
    }),
  });
};

/**
 * Fetches the full list of registered users on the platform.
 * @returns Array of usernames (strings)
 */
export const fetchAllUsers = async (): Promise<string[]> => {
    const res = await fetch(SERVER + routesRequest.users, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    
    if (!res.ok) {
      throw new Error("Error retrieving all users");
    }

    
    const data = await res.json();

    if(data)
      return data.users.map((user: any) => user.username);
    else
      return [];
  };