import { motion } from "framer-motion";

import "../styles/card.css"

export default function CardStack() {
  const emptyCards = [
    { id: 1, color: "shuffle" },
    { id: 2, color: "favor" },
    { id: 3, color: "attack"}
  ];

  return (
      <div className="stack">
        {emptyCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: -index * 10, opacity: 1, rotate: index * 20 * (index % 2) - 5 * index }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            style={{
              backgroundColor: card.color
            }}
            className= {"stack-card card " + card.color}
          >
            {card.text}
          </motion.div>
        ))}
      </div>
  );
}
