import React, { useEffect, useState } from "react";
import { UserContextType, useUser } from "../../context/UserContext";
import { buyItem, fetchShopItems, Product } from "../../services/apiShop";
import { CATEGORIES } from "../../utils/types";
import GlassCard from "../../common/GlassCard/GlassCard";
import coinIcon from "../../../assets/coins.png";
import { ShopItem } from "../../components/shop/CardShop";
import SortingControls from "../../components/shop/SortingControls";

const Shop: React.FC = () => {
    const [shopData, setShopData] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeCategory, setActiveCategory] = useState<string>("All");
    const [sortOrder, setSortOrder] = useState<string>("default");
  
    const userContext: UserContextType = useUser();
    const coins = userContext.user?.coins || 0;
    const background: string = userContext.user?.userPersonalizeData.background || 'default'; // Default background if not set
  
  
    const loadShopItems = async () => {
      try {
        const items: Product[] = await fetchShopItems();
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
      
    const sortedItems = [...filteredItems].sort((a, b) => {
      if (sortOrder === 'price-asc') {
        return a.price - b.price;
      } else if (sortOrder === 'price-desc') {
        return b.price - a.price;
      }
      // Default order (no sorting)
      return 0;
    });
  
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
          background={background}
        >
        
            {/* Money */}
            <div className="shop-balance">
                <img src={coinIcon} alt="Coins" className="balance-icon" />
                <span className="balance-amount">{coins}</span>
            </div>

            {/* Buttons for categories */}
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
            
            {/* Sorting controls */}
            {!loading && filteredItems.length > 0 && (
              <SortingControls 
                sortOrder={sortOrder} 
                onSortChange={setSortOrder} 
              />
            )}
            
            {/* Items */}
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
                {sortedItems.map((item, idx) => (
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