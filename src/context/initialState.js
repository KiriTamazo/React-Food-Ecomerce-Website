import { fetchUser } from "../utility/fetchLocalStorage";

const userInfo = fetchUser();

export const initialState = {
  user: userInfo,
};
