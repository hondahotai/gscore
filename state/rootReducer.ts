import { combineReducers } from "redux";
import userSlice from "./ducks/user/slice";

const rootReducer = combineReducers({
  user: userSlice,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
