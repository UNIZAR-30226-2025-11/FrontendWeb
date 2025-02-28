import { useState } from "react";

import "../styles/CardDeck.css"

const deckSize = 10;
const cards = Array.from({ length: deckSize }, (_, i) => ({
  id: i + 1,
  image: "assets/cardAttack.jpg",
}));

const CardDeck = () => {
	const [deck, setDeck] = useState(cards);

	const drawCard = () => {
		if (deck.length === 0) return;
		setDeck(deck.slice(1));
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
