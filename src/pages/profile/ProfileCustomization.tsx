import React, { useEffect, useState } from "react";
import GlassCard from "../../common/GlassCard/GlassCard";
import { IMAGES_PATH, IMAGES_EXTENSION, fetchOwnedProducts, updateOwnedProduct } from "../../services/apiShop";
import { useUser } from "../../context/UserContext";
import { ProductOwned } from "../../api/entities";
import "./ProfileCustomization.css";

type CustomizationCategory = "avatar" | "background";

const ProfileCustomization: React.FC = () => {
  const { user, refreshUser } = useUser();
  const [ownedItems, setOwnedItems] = useState<{
    avatar: ProductOwned[];
    background: ProductOwned[];
  }>({
    avatar: [],
    background: []
  });
  const [activeCategory, setActiveCategory] = useState<CustomizationCategory>("avatar");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const allOwnedProducts = await fetchOwnedProducts();
        
        setOwnedItems({
          avatar: allOwnedProducts.filter(item => item.categoryUrl === "avatar"),
          background: allOwnedProducts.filter(item => item.categoryUrl === "background")
        });
      } catch (error) {
        console.error("Failed to load customization items", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadItems();
  }, []);

  const handleItemChange = async (itemUrl: string, category: CustomizationCategory) => {
    try {
      await updateOwnedProduct(itemUrl, category);
      await refreshUser();
    } catch (error) {
      console.error(`Failed to change ${category}:`, error);
    }
  };

  const getCategoryTitle = (category: CustomizationCategory): string => {
    return category === "avatar" ? "Avatar" : "Background";
  };

  const getCurrentSelection = (category: CustomizationCategory): string => {
    if (!user) return "";
    return category === "avatar" 
      ? user.userPersonalizeData.avatar
      : user.userPersonalizeData.background;
  };

  const getItems = () => ownedItems[activeCategory] || [];

  return (
    <GlassCard 
      title="Customize Your Profile" 
      maxwidth="700px" 
      minwidth="320px" 
      showPaws={true}
      background={user?.userPersonalizeData.background}
    >
      <div className="pc-customization-tabs">
        <button 
          className={`pc-customization-tab ${activeCategory === "avatar" ? 'pc-active' : ''}`}
          onClick={() => setActiveCategory("avatar")}
        >
          <span className="pc-tab-icon">😺</span> Avatars
        </button>
        <button 
          className={`pc-customization-tab ${activeCategory === "background" ? 'pc-active' : ''}`}
          onClick={() => setActiveCategory("background")}
        >
          <span className="pc-tab-icon">🖼️</span> Backgrounds
        </button>
      </div>

      <h3 className="pc-category-title">Choose Your {getCategoryTitle(activeCategory)}</h3>

      <div className="pc-customization-container">
        {isLoading ? (
          <div className="pc-loading-state">
            <div className="pc-loading-spinner"></div>
            <p>Loading {activeCategory}s...</p>
          </div>
        ) : getItems().length > 0 ? (
          <div className="pc-items-grid">
            {getItems().map(item => (
              <div
                key={item.productName}
                className={`pc-customization-item ${
                  getCurrentSelection(activeCategory) === item.productUrl ? "pc-selected" : ""
                }`}
                onClick={() => handleItemChange(item.productUrl, activeCategory)}
              >
                <img
                  src={`${IMAGES_PATH}/${activeCategory}/${item.productUrl}${IMAGES_EXTENSION}`}
                  alt={item.productName}
                  className="pc-item-image"
                />
                <div className="pc-item-name">{item.productName}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="pc-empty-state">
            <div className="pc-empty-icon">
              {activeCategory === "avatar" ? "😺" : "🖼️"}
            </div>
            <h4 className="pc-empty-message">
              No {activeCategory === "avatar" ? "Avatars" : "Backgrounds"} Found
            </h4>
            <p className="pc-empty-subtitle">
              Visit the shop to get some cool {activeCategory === "avatar" ? "avatars" : "backgrounds"} for your profile.
            </p>
            <button 
              className="pc-shop-button" 
              onClick={() => window.location.href = '/shop'}
            >
              <span className="pc-button-icon">🛒</span>
              Visit Shop
            </button>
          </div>
        )}
      </div>
    </GlassCard>
  );
};

export default ProfileCustomization;