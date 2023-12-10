import { createSlice } from "@reduxjs/toolkit";
import { IProduct, User } from "@/state/ducks/user/types";
import { PayloadAction } from "@reduxjs/toolkit";

const initialState: User = {
  token: "",
  userName: "",
  products: [],
  subscribeId: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    addProduct(state, action: PayloadAction<IProduct>) {
      state.products = [action.payload];
    },
    setUserName(state, action: PayloadAction<string>) {
      state.userName = action.payload;
    },
    setSubscribeId(state, action: PayloadAction<number | null>) {
      state.subscribeId = action.payload;
    },
    logout(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    },
    clearProducts(state) {
      state.products = [];
    },
  },
});

export const {
  setToken,
  addProduct,
  setUserName,
  setSubscribeId,
  logout,
  clearProducts,
} = userSlice.actions;
export default userSlice.reducer;
