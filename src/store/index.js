import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../project/reducers/userReducer";

const store = configureStore({
  reducer: {user: userReducer },
});

export default store;