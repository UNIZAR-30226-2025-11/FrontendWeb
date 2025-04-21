export type UserJSON = {
  username: string;
  coins: number;
  statistics: StatisticsJSON;
  userPersonalizeData: UserPersonalizeDataJSON;
}

type StatisticsJSON = {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  bestStreak: number;
  totalTimePlayed: number;
  totalTurnsPlayed: number;
  lastFiveGames: RecordJSON[];
}

type UserPersonalizeDataJSON = {
  avatar: string;
  background: string;
}

type RecordJSON = {
  gameDate: Date;
  isWinner: boolean;
  lobbyId: string;
}

export type UserAvatar = { 
  username: string;
  avatar: string;
}

export type AllUserData = {
  username: string;
  avatar: string;
  status: "friend" | "pending" | "none";
}

export type FriendsJSON = {
  username: string;
  avatar: string;
  isAccepted: boolean;
}