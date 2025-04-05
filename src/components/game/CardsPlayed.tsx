import React from "react";
import { motion } from "framer-motion";

import './Card.css'
import { useSocket } from "../../context/SocketContext";

export default function PlayedCards() {
	const socket = useSocket();
  
	// Definition os some random played cards
	const emptyCards = [
		{ id: 1, name: "Shuffle" },
		{ id: 2, name: "Favor" },
		{ id: 3, name: "Attack"}
	];

	return (
		<div className="stack">
			{/* Print all played cards */}
			{emptyCards.map((card, index) => (
				<motion.div
					key={card.id}
					initial={{ y: 50, opacity: 0 }}
					animate={{ y: -index * 10, opacity: 1, rotate: index * 20 * (index % 2) - 5 * index }}
					transition={{ delay: index * 0.2, duration: 0.5 }}
					className= {"stack-card "}
					>
					<img 	className="card"
							src={"../../../assets/cards/" + card.name + ".jpg"}
							alt={card.name}></img>
				</motion.div>
			))}
		</div>
	);
}
