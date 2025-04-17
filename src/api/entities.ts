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
  cardstyle: string;
}

type RecordJSON = {
  gameDate: Date;
  isWinner: boolean;
  lobbyId: string;
}