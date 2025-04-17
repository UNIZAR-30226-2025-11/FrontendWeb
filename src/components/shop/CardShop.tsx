import React, { useEffect, useState } from "react";
import './CardShop.css';
import { fetchShopItems, buyItem, Product, IMAGES_PATH, IMAGES_EXTENSION } from "../../services/apiShop";
import coinIcon from "../../../assets/coins.png";
import GlassCard from "../../common/GlassCard/GlassCard";
import { UserContextType, useUser } from "../../context/UserContext";


const CATEGORIES: Record<string, {name: string, icon: string}> = {
  "avatar": {name: "Avatar", icon: "👤"},
  "background": {name: "Background", icon: "🖼️"},
  "cardstyle": {name: "Card Style", icon: "🃏"},
}



type ShopItemProps = {
  item: Product;
  onBuy: () => void;
  canAfford: boolean;
  coins: number;
};

const ShopItem: React.FC<ShopItemProps> = ({ item, onBuy, canAfford, coins }) => {
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

const Shop: React.FC = () => {
  const [shopData, setShopData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const  userContext: UserContextType = useUser();
  const coins = userContext.user?.coins || 0;

  const loadShopItems = async () => {
    try {
      const items: Product[] = await fetchShopItems();
      console.log(items);
      setShopData(items);
    } catch (error) {
      console.error("Failed to load shop items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async (item: Product) => {
    if (item.isBought || coins < item.price) return;
    
    try {
      await buyItem(item);
      // Show success notification
      const notification = document.createElement('div');
      notification.className = 'purchase-notification';
      notification.innerHTML = `✨ You purchased ${item.productName}!`;
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.classList.add('show');
      }, 100);
      
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 500);
      }, 3000);
      
      await loadShopItems();
      userContext.refreshUser(); // Refresh user data to update coins
    } catch (error) {
      console.error("Purchase failed:", error);
    }
  };

  useEffect(() => {
    loadShopItems();
  }, []);

  const getCategoryIcon = (category: string) => {
    return CATEGORIES[category]?.icon || "🏪";
  };

  const filteredItems = activeCategory === "All" 
    ? shopData 
    : shopData.filter(item => item.categoryUrl === activeCategory);

  const canAffordItem = (price: number) => {
    return coins >= price;
  };

  return (
    <div className="content">
      <GlassCard 
        title="Exploding Kittens Shop" 
        className="shop-glass-card"
        maxwidth="1200px"
        showPaws={true}
        autoFit={false}
      >
        <div className="shop-balance">
          <img src={coinIcon} alt="Coins" className="balance-icon" />
          <span className="balance-amount">{coins}</span>
        </div>
        <div className="category-tabs">
          <button 
            className={`category-tab ${activeCategory === "All" ? 'active' : ''}`}
            onClick={() => setActiveCategory("All")}
          >
            🏪 All
          </button>
          {Object.keys(CATEGORIES).map(category => (
            <button 
              key={category}
              className={`category-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {getCategoryIcon(category)} {CATEGORIES[category].name}
            </button>
          ))}
        </div>
        
        {loading ? (
          <div className="shop-loading">
            <div className="loading-spinner"></div>
            <p>Loading fantastic items...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="no-items">
            <p>😿 No items found in this category</p>
          </div>
        ) : (
          <div className="shop-items">
            {filteredItems.map((item, idx) => (
              <ShopItem 
                key={idx} 
                item={item} 
                onBuy={() => handleBuy(item)}
                canAfford={canAffordItem(item.price)}
                coins={coins}
              />
            ))}
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default Shop;