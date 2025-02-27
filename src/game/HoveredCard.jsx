import { useState } from "react";

const cards = [
  { id: 1, image: "https://via.placeholder.com/150" },
  { id: 2, image: "https://via.placeholder.com/150" },
  { id: 3, image: "https://via.placeholder.com/150" },
];

const CardGallery = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div style={{ display: "flex", gap: "10px", padding: "20px" }}>
      {cards.map((card) => (
        <div
          key={card.id}
          style={{ width: "150px", height: "200px", cursor: "pointer" }}
          onMouseEnter={() => setHoveredCard(card)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <img src={card.image} alt="Card" style={{ width: "100%", height: "100%" }} />
        </div>
      ))}
      {hoveredCard && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "300px",
            height: "400px",
            background: "white",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            borderRadius: "10px",
          }}
        >
          <img
            src={hoveredCard.image}
            alt="Enlarged Card"
            style={{ width: "100%", height: "100%", borderRadius: "10px" }}
          />
        </div>
      )}
    </div>
  );
};

export default CardGallery;
