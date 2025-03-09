type Card = {
    name: string;
    id: number;
}

type Player = {
    username: string;
    numCards: number;
};

type GameState = {
    players: Player[];
    cards: Card[];
};