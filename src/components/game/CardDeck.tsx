import React from "react";
import { useState } from "react";

import "./CardDeck.css"
import { playCards } from "../../services/socketService";
import { SocketContextType, useSocket } from "../../context/SocketContext";

const MAX_CARDS_TO_SHOW = 20;

const CardDeck = (
	{} : {}
) => {

	const socket:SocketContextType = useSocket()

	const deckSize = socket.gameState?.cardsLeftInDeck!;
	const cards = Array.from({ length: deckSize < MAX_CARDS_TO_SHOW ? deckSize : MAX_CARDS_TO_SHOW }, (_, i) => ({
		id: i + 1,
		image: "assets/cards/Attack.jpg",
	}));

	const [deck, setDeck] = useState(cards);

	const active:boolean = socket.gameState?.turnUsername == socket.gameState?.playerUsername
	const lobbyID:string = socket.gameState?.lobbyId!

	const drawCard = () => {
		// Check if there are cards and it's your turn
		if (deck.length === 0 || !active) return;

		// Remove the card and visual effect
		if (socket.gameState?.cardsLeftInDeck! <= cards.length)
			setDeck(deck.slice(0, socket.gameState?.cardsLeftInDeck));

		// Send the message to the backend
		playCards(  socket.socket,
					[],
					lobbyID,
					socket.setCardPlayedResult)
	};

	return (
	<div className="div-deck">
		{/* Deck of cards */}
		<div
			className="deck"
			onClick={drawCard}>

				{/* Each card */}
				{deck.map((card, index) => (
					<img
					key={card.id}
					src={card.image}
					alt="Card"
					style={{
						top: `${index * -3}px`,
						left: `${index * 2}px`,

					}}
					className="card-in-deck"
					/>
				))}
		</div>

		{/* Information of the deck */}
		<p className="p-deck">
			Remaining cards: {deckSize}
		</p>
	</div>
	);
};

export default CardDeck;
