import React, { useEffect, useState } from "react";
import './CardShop.css';
import { fetchShopItems, buyItem, Product } from "../../services/apiShop";

type ShopItemProps = {
  item: Product;
  onBuy: () => void;
};

const ShopItem: React.FC<ShopItemProps> = ({ item, onBuy }) => (
  <div className="shop-item">
    <h3 className="item-title">{item.name}</h3>
    <p className="item-price">Price: ${item.price}</p>
    <button className="buy-button" disabled={item.isBought} onClick={onBuy}>
      {item.isBought ? "Already Purchased" : "Buy"}
    </button>
  </div>
);

const Shop: React.FC = () => {
  const [shopData, setShopData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const loadShopItems = async () => {
    try {
      const items = await fetchShopItems();
      console.log(items);
      setShopData(items);
    } catch (error) {
      alert((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async (item: Product) => {
    try {
      await buyItem(item);
      alert("Item purchased!");
      loadShopItems();
    } catch (error) {
      alert((error as Error).message);
    }
  };

  useEffect(() => {
    loadShopItems();
  }, []);

  return (
    <div className="shop-container">
      <header className="shop-header">
        <h1>Exploding Kittens Shop</h1>
      </header>
      <div className="shop-scrollable">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <main className="shop-items">
            {shopData.map((item, idx) => (
              <ShopItem key={idx} item={item} onBuy={() => handleBuy(item)} />
            ))}
          </main>
        )}
      </div>
    </div>
  );
};

export default Shop;
