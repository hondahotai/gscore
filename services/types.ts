export type ISignUp = {
  email: string;
  username: string;
  password: string;
  token: string;
};

export interface ISignIn {
  email: string;
  password: string;
  token: string;
  user: User;
}

export type User = {
  username: string;
};

export type ISubscribe = {
  priceId: number;
};

export type ISelfSubscriptions = SelfSubscriptionType[];

export interface SelfSubscriptionType {
  id: number;
  userId: number;
  codes: ICode[];
  productId: number;
  product: IProduct;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  status: string;
}

export interface ICode {
  id: number;
  code: string;
  origin?: string;
  status: string;
  subscribeId: number;
  subscribe: string;
  userId: number;
  user: string;
}

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

export interface ICodeManage {
  codesIds: number[];
  subscribeId: number;
}
export type IActivateCode = {
  code: string;
};

export type IChangeProduct = {
  productId: number | null;
  subscribeId: number | null;
};

export type IUpdatePersonalData = {
  email: string;
  username: string;
};

export type IUpdatePassword = {
  currentPassword: string;
  newPassword: string;
};
