import React, {
useState,
useImperativeHandle,
forwardRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./CardDeck.css";
import { playCards } from "../../services/socketService";
import { SocketContextType, useSocket } from "../../context/SocketContext";

// Max number of cards shown in the deck
const MAX_CARDS_SHOWN = 20;

/**
 * Component for defining a deck of cards
 */
const CardDeck = forwardRef((CardDeckHandle, ref) => {

	// Socket for extract the necessary information
	const socket: SocketContextType = useSocket();

	// Remaining cards in the deck
	const deckSize = socket.gameState?.cardsLeftInDeck!;

	// True if is the turn of the user. False otherwise
	const active = 	socket.gameState?.turnUsername ===
					socket.gameState?.playerUsername;

	// Deck of cards with lenght the minimum between MAX_CARDS_SHOWN
	// and the remaining cards.
	const [deck, setDeck] = useState(() =>
		Array.from({ length: Math.min(deckSize, MAX_CARDS_SHOWN) }, (_, i) => ({
		id: i + 1,
		image: "assets/cards/Attack.jpg",
		}))
	);

	// Variables for storing the information for visual effects
	const [isShuffling, setIsShuffling] = useState(false);
	const [stolenCardId, setStolenCardId] = useState<number | null>(null);

	/**
	 * If the Deck is active and there are cards, sends
	 * to the Backend the request of a new card.
	 */
	const drawCard = () => {
		// Check if active and there are cards for stealing
		if (!active || deck.length === 0) return;

		// Remove the last card
		// setDeck((prev) => prev.slice(1));

		// Send to the Backend the action
		playCards(	socket.socket, [],
					socket.gameState?.lobbyId!,
					socket.setCardPlayedResult);
	};

	/**
	 * Visual effects for shuffle the deck.
	 */
	const shuffleDeck = () => {
		// Init the shuffle
		setIsShuffling(true);

		// End the shuffel in 1 second
		setTimeout(() => setIsShuffling(false), 1000);
	};

	/**
	 * Visual effects for stealing a card
	 * @returns 
	 */
	const stealCard = () => {
		if (deck.length === 0) return;

		setStolenCardId(deck[deck.length - 1].id);

		setTimeout(() => {
			setDeck((prev) => prev.slice(0,deck.length-1));
			setStolenCardId(null);
		}, 1000);
	};

	// 👇 Expose functions to parent using ref
	useImperativeHandle(ref, () => ({
		shuffleDeck,
		stealCard,
	}));

	return (
		<div className="div-deck">
		<div className="deck" onClick={drawCard}>
			<AnimatePresence>
			{deck.map((card, index) => {
				const isStolen = card.id === stolenCardId;
				return (
				<motion.img
					key={card.id}
					src={card.image}
					alt="Card"
					className="card-in-deck"
					initial={{
					opacity: 0,
					scale: 0.8,
					rotate: isShuffling ? Math.random() * 360 : 0,
					}}
					animate={{
					scale: 1,
					top: isShuffling ? `${Math.random() * -20}px` : `${index * -3}px`,
					left: isShuffling ? `${Math.random() * 10}px` : `${index * 2}px`,
					rotate: isShuffling ? 0 : undefined,
					x: isStolen ? 200 : 0,
					y: isStolen ? -200 : 0,
					opacity: isStolen ? 0 : 1,
					}}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.5 }}
					style={{ position: "absolute" }}
				/>
				);
			})}
			</AnimatePresence>
		</div>

		<p className="p-deck">Remaining cards: {deckSize}</p>
		</div>
	);
});

export default CardDeck;
  