import React from "react";

import '../styles/CardShop.css';

const ShopItem = ({ item }) => (
  <div className="shop-item">
    <img src={item.image} alt={item.name} className="item-image" />
    <h3 className="item-title">{item.name}</h3>
    <p className="item-description">{item.description}</p>
    <p className="item-price">Price: ${item.price}</p>
    <button className="buy-button">Add to Cart</button>
  </div>
);

const Shop = () => {
  // Example shop items with prices for testing grid alignment
  const items = [
    {
      id: 1,
      name: 'A',
      description: 'A description of the item',
      image: 'i',
      price: 9.99
    },
    {
      id: 2,
      name: 'B',
      description: 'A description of the item',
      image: 'i',
      price: 2.99
    },
    {
      id: 3,
      name: 'C',
      description: 'A description of the item',
      image: 'i',
      price: 1.99
    },
    {
      id: 4,
      name: 'D',
      description: 'A description of the item',
      image: 'i',
      price: 3.99
    },
    {
      id: 5,
      name: 'E',
      description: 'A description of the item',
      image: 'i',
      price: 1.49
    },
    {
      id: 6,
      name: 'F',
      description: 'A description of the item',
      image: 'i',
      price: 4.99
    },
    {
      id: 7,
      name: 'G',
      description: 'A description of the item',
      image: 'i',
      price: 0.99
    },
    {
      id: 8,
      name: 'H',
      description: 'A description of the item',
      image: 'i',
      price: 1.29
    },
    {
      id: 9,
      name: 'I',
      description: 'A description of the item',
      image: 'i',
      price: 0.79
    },
    {
      id: 10,
      name: 'J',
      description: 'A description of the item',
      image: 'i',
      price: 5.99
    },
  ];

  return (
    <div className="shop-container">
      <header className="shop-header">
        <h1>Exploding Kittens Shop</h1>
      </header>
      <div className="shop-scrollable">
        <main className="shop-items">
          {items.map(item => (
            <ShopItem key={item.id} item={item} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default Shop;
