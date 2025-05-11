import { AllUserData, FriendsJSON, UserAvatar } from "../api/entities";
import { SERVER } from "../utils/config";
import { routesRequest } from "../utils/constants";

/**
 * Fetches the list of friends for the current user.
 * @returns Array of usernames (strings)
 */
export const fetchFriends = async (): Promise<{friends: FriendsJSON[], numRequests: number}> => {
  const res = await fetch(SERVER + routesRequest.friends, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if(data) {
    const friends:FriendsJSON[] = data.users.map((user: FriendsJSON) => ({username:user.username, avatar:user.avatar, isAccepted:user.isAccepted}));
    const numRequests = data.numRequests || 0; // Default to 0 if not present
    return {friends, numRequests};
  }
  else
    return {friends: [], numRequests: 0};
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
export const fetchFriendRequests = async (): Promise<UserAvatar[]> => {
  const res = await fetch(SERVER + routesRequest.friendRequest, {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  if(data)
    return data.users.map((user: UserAvatar) => ({username:user.username, avatar:user.avatar}));
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
export const fetchAllUsers = async (): Promise<AllUserData[]> => {
    const res = await fetch(SERVER + routesRequest.users, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });
    
    const data = await res.json();

    if(data)
      return data.map((user: AllUserData) => ({username:user.username, avatar:user.avatar, status:user.status}));
    else
      return [];
  };