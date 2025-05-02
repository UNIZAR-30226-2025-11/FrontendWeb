import React, { useEffect, useState } from "react";
import GlassCard from "../../common/GlassCard/GlassCard";
import { IMAGES_PATH, IMAGES_EXTENSION, fetchOwnedProducts, updateOwnedProduct } from "../../services/apiShop";
import { useUser } from "../../context/UserContext";
import "./AvatarSelection.css";
import { ProductOwned } from "../../api/entities";

const AvatarSelection = () => {
  const { user, refreshUser } = useUser();
  const [ownedAvatars, setOwnedAvatars] = useState<ProductOwned[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAvatars = async () => {
      try {
        let avatarOwned: ProductOwned[] = await fetchOwnedProducts();
        avatarOwned.filter(avatar => avatar.categoryUrl === "avatar");
        setOwnedAvatars(avatarOwned);
      } catch (error) {
        console.error("Failed to load avatars", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAvatars();
  }, []);

  const handleAvatarChange = async (avatarName: string) => {
    try {
      await updateOwnedProduct(avatarName, "avatar");
      await refreshUser();
    } catch (error) {
      console.error("Failed to change avatar:", error);
    }
  };

  return (
    <GlassCard 
      title="Choose Your Avatar" 
      maxwidth="700px" 
      minwidth="320px" 
      showPaws={true}
      background={user?.userPersonalizeData.background}>
      <div className="avatar-selection-container">
        {isLoading ? (
          <p>Loading avatars...</p>
        ) : ownedAvatars.length > 0 ? (
          ownedAvatars.map(avatar => (
            <div
              key={avatar.productName}
              className={`avatar-item ${
                user?.userPersonalizeData.avatar === avatar.productUrl ? "selected" : ""
              }`}
              onClick={() => handleAvatarChange(avatar.productUrl)}
            >
              <img
                src={`${IMAGES_PATH}/avatar/${avatar.productUrl}${IMAGES_EXTENSION}`}
                alt={avatar.productName}
                className="avatar-image"
              />
            </div>
          ))
        ) : (
          <p>You haven&apos;t purchased any avatars yet.</p>
        )}
      </div>
    </GlassCard>
  );
};

export default AvatarSelection;
