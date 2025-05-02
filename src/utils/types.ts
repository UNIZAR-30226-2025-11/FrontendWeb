export type Card = {
    name: string;
    id: number;
}

export type Item = {
    name: string;
    description: string;
    price: number;
    image: string;
}

export enum CardType {
    Bomb, // Bomb card
    SeeFuture, // See the next 3 cards
    Shuffle, // Shuffle the deck
    Skip, // Skip the next player
    Attack, // Next player draws 2 cards
    Nope, // Cancel the last action
    Favor, // Force a player to give you a card
    Deactivate, // Deactivate a card
    RainbowCat, // Wild card
    TacoCat, // Wild card
    HairyPotatoCat, // Wild card
    Cattermelon, // Wild card
    BeardCat // Wild card
}

export enum SelectionType {
    User,
    Card,
    CardType
}

export type CardDeckHandle = {
    shuffleDeck: () => void;
    stealCard: () => void;
  };


export const CATEGORIES: Record<string, {name: string, icon: string}> = {
    "avatar": {name: "Avatar", icon: "👤"},
    "background": {name: "Background", icon: "🖼️"},
}