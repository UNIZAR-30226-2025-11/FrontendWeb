import { SERVER } from "../utils/config";
import { routesRequest } from "../utils/constants";

/**
 * Sends a request to update the user's avatar.
 * The backend will extract the username from the session/token.
 */
export const updateUserAvatar = async (avatar: string): Promise<void> => {
  const res = await fetch(SERVER + routesRequest.user, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ avatar })
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to update avatar");
  }
};

/**
 * Sends a request to update the user's background.
 */
export const updateUserBackground = async (background: string): Promise<void> => {
  const res = await fetch(SERVER + routesRequest.user, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ background }) // this is key!
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to update background");
  }
};