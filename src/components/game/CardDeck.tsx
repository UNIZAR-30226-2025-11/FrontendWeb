import React from "react";
import { useState } from "react";

import "./CardDeck.css"
import { playCards } from "../../services/socketService";
import { SocketContextType, useSocket } from "../../context/SocketContext";
import * as Objects from "../../api/JSON"

const deckSize = 20;
const cards = Array.from({ length: deckSize }, (_, i) => ({
  id: i + 1,
  image: "assets/cards/Attack.jpg",
}));

const CardDeck = (
	{} : {}
) => {
	const [deck, setDeck] = useState(cards);
	const socket:SocketContextType = useSocket()

	const active:boolean = socket.gameState?.turnUsername == socket.gameState?.playerUsername
	const lobbyID:string = socket.gameState?.lobbyId!

	const drawCard = () => {
		if (deck.length === 0 || !active) return;
		setDeck(deck.slice(1));

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
			Remaining cards: {deck.length}
		</p>
	</div>
	);
};

export default CardDeck;
