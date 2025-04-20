import React, { useEffect, useState } from "react";
import GlassCard from "../../common/GlassCard/GlassCard";
import { IMAGES_PATH, IMAGES_EXTENSION, fetchShopItems, Product } from "../../services/apiShop";
import { useUser } from "../../context/UserContext";
import { updateUserAvatar } from "../../services/apiUser";
import "./AvatarSelection.css";

const AvatarSelection = () => {
  const { user, refreshUser } = useUser();
  const [ownedAvatars, setOwnedAvatars] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAvatars = async () => {
      try {
        const products = await fetchShopItems();
        const avatars = products.filter(p => p.categoryUrl === "avatar" && p.isBought);
        setOwnedAvatars(avatars);
      } catch (error) {
        console.error("Failed to load avatars", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAvatars();
  }, []);

  const handleAvatarChange = async (avatar: string) => {
    try {
      await updateUserAvatar(avatar);
      await refreshUser();
      // console.log(user?.userPersonalizeData.avatar);
    } catch (error) {
      console.error("Failed to change avatar:", error);
    }
  };

  return (
    <GlassCard title="Choose Your Avatar" maxwidth="700px" minwidth="320px" showPaws={true}>
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
          <p>You haven't purchased any avatars yet.</p>
        )}
      </div>
    </GlassCard>
  );
};

export default AvatarSelection;
