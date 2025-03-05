import { motion } from "framer-motion";

import "../styles/card.css"

export default function PlayedCards() {
  // Definition os some random played cards
  const emptyCards = [
    { id: 1, name: "shuffle" },
    { id: 2, name: "favor" },
    { id: 3, name: "attack"}
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
				className= {"card stack-card " + card.name}
				>
			</motion.div>
		))}
	</div>
  );
}
