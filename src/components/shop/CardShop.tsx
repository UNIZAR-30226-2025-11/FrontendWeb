import React from "react";
import './CardShop.css';
import coinIcon from "../../../assets/coins.png";
import { IMAGES_EXTENSION, IMAGES_PATH, Product } from "../../services/apiShop";

type ShopItemProps = {
  item: Product;
  onBuy: () => void;
  canAfford: boolean;
  coins: number;
};

export const ShopItem: React.FC<ShopItemProps> = ({ item, onBuy, canAfford, coins }) => {
  let itemClass = "shop-item";
  let buttonClass = "shop-button";
  let buttonText = "Buy Now";
  
  if (item.isBought) {
    itemClass += " bought";
    buttonClass += " owned-button";
    buttonText = "Owned";
  } else if (!canAfford) {
    itemClass += " available unaffordable";
    buttonClass += " unaffordable-button";
    buttonText = "Not Enough Coins";
  } else {
    itemClass += " available";
    buttonClass += " buy-button";
  }

  return (
    <div className={itemClass}>
      <div className="item-image-container">
        <img 
          src={`${IMAGES_PATH}/${item.categoryUrl}/${item.productUrl}${IMAGES_EXTENSION}`} 
          alt={item.categoryUrl + "-" + item.productUrl} 
          className="item-image" 
        />
        {item.isBought && <div className="item-owned-badge">Owned</div>}
        {!item.isBought && !canAfford && (
          <div className="item-price-badge">
            <img src={coinIcon} alt="Coins" className="badge-price-icon" />
            <span className="price-difference">-{item.price - (coins || 0)}</span>
          </div>
        )}
      </div>
      <h3 className="item-title">{item.productName + " " + item.categoryName}</h3>
      <p className="item-price">
        <img src={coinIcon} alt="Coins" className="price-icon" /> {item.price}
      </p>
      <button 
        className={buttonClass}
        disabled={item.isBought || !canAfford} 
        onClick={onBuy}
      >
        {buttonText}
      </button>
    </div>
  );
};

