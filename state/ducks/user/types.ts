export type User = {
  token: string | null;
  userName: string;
  products: IProduct[];
  subscribeId: number | null;
};

export type IProduct = {
  id: number;
  sitesCount: number;
  name: string;
  prices: IPrices[];
};

export type IPrices = {
  id: number;
  isActive: boolean;
  price: string;
  productId: number;
};
