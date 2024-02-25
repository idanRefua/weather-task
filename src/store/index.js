import { configureStore } from "@reduxjs/toolkit";

import favouritesReducer from "./favourites";

const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
  },
});

export default store;
