import { SERVER } from "../utils/config";
import { routesRequest } from "../utils/constants";

export type Product = {
  name: string;
  price: number;
  isBought: boolean;
  category: string;
};

type Category = {
  name: string;
  products: {
    name: string;
    price: number;
    isBought: boolean;
  }[];
};

type ShopApiResponse = {
  categories: {
    categories: Category[];
  };
};

/**
 * Retrieves shop items from the server.
 */
export const fetchShopItems = async (): Promise<Product[]> => {
  const res = await fetch(SERVER + routesRequest.shop, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (!res.ok) {
    throw new Error("Error retrieving shop items");
  }

  const data: ShopApiResponse = await res.json();

  const categories = data.categories?.categories || [];
  return categories.flatMap(cat =>
    cat.products.map(product => ({
      ...product,
      category: cat.name
    }))
  );
};

/**
 * Sends a request to buy an item.
 */
export const buyItem = async (item: Product): Promise<void> => {
  const res = await fetch(SERVER + routesRequest.shop, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      resp: {
        categoryName: item.category,
        productName: item.name
      }
    })
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Error when purchasing item");
  }
};
