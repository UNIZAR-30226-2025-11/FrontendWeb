import { ProductOwned } from "../api/entities";
import { SERVER } from "../utils/config";
import { routesRequest } from "../utils/constants";


export const IMAGES_PATH: string = "../../../assets/shop";
export const IMAGES_EXTENSION: string = ".png";

export type Product = {
  productName: string;
  productUrl: string;
  categoryName: string;
  categoryUrl: string;
  price: number;
  isBought: boolean;
};

type Category = {
  name: string;
  url: string;
  products: {
    name: string;
    url: string;
    price: number;
    isBought: boolean;
  }[];
};

type ShopApiResponse = {
  categories: Category[];
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
  const categories: Category[] = data.categories! || [];
  const products: Product[] =  categories.flatMap(cat =>
    cat.products.map(product => ({
      productName: product.name,
      productUrl: product.url,
      categoryName: cat.name,
      categoryUrl: cat.url,
      price: product.price,
      isBought: product.isBought
    }))
  );
  return products
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
        categoryName: item.categoryUrl,
        productName: item.productUrl,
      }
    })
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Error when purchasing item");
  }
};

export const fetchOwnedProducts = async (): Promise<ProductOwned[]> => {
  
  const res = await fetch(SERVER + routesRequest.productsOwned, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch owned products");
  }

  const data = await res.json();
  return data.products as ProductOwned[];
}

export const updateOwnedProduct = async (productUrl: string, categoryUrl: string): Promise<void> => {
  
  const res = await fetch(SERVER + routesRequest.productsOwned, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      resp: {
        categoryName: categoryUrl,
        productName: productUrl
      }
    })
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to update background");
  }
};