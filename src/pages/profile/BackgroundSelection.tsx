import React, { useEffect, useState } from "react";
import GlassCard from "../../common/GlassCard/GlassCard";
import { IMAGES_PATH, IMAGES_EXTENSION, fetchShopItems, Product, fetchOwnedProducts, updateOwnedProduct } from "../../services/apiShop";
import { useUser } from "../../context/UserContext";
import "./BackgroundSelection.css";
import { ProductOwned } from "../../api/entities";

const BackgroundSelection = () => {
  const { user, refreshUser } = useUser();
  const [ownedBackgrounds, setOwnedBackgrounds] = useState<ProductOwned[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBackgrounds = async () => {
      try {
        let ownedBackgrounds: ProductOwned[] = await fetchOwnedProducts();
        ownedBackgrounds = ownedBackgrounds.filter(bg => bg.categoryUrl === "background");
        console.log(ownedBackgrounds);
        setOwnedBackgrounds(ownedBackgrounds);
      } catch (error) {
        console.error("Failed to load backgrounds", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBackgrounds();
  }, []);

  const handleBackgroundChange = async (backgroundName: string) => {
    try {
      await updateOwnedProduct(backgroundName, "background");
      await refreshUser();
    } catch (error) {
      console.error("Failed to change background:", error);
    }
  };

  return (
    <GlassCard 
      title="Choose Your Background" 
      maxwidth="700px" 
      minwidth="320px" 
      showPaws={true}
      background={user?.userPersonalizeData.background}
    >
      <div className="avatar-selection-container">
        {isLoading ? (
          <p>Loading backgrounds...</p>
        ) : ownedBackgrounds.length > 0 ? (
          ownedBackgrounds.map(bg => (
            <div
              key={bg.productName}
              className={`avatar-item ${
                user?.userPersonalizeData.background === bg.productUrl ? "selected" : ""
              }`}
              onClick={() => handleBackgroundChange(bg.productUrl)}
            >
              <img
                src={`${IMAGES_PATH}/background/${bg.productUrl}${IMAGES_EXTENSION}`}
                alt={bg.productName}
                className="avatar-image"
              />
            </div>
          ))
        ) : (
          <p>You haven't purchased any backgrounds yet.</p>
        )}
      </div>
    </GlassCard>
  );
};

export default BackgroundSelection;
