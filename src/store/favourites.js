import { createSlice } from "@reduxjs/toolkit";

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: { favourites: [] },
  reducers: {
    addCityToFavourites(state, action) {
      if (!state.favourites.some((city) => city.id === action.payload.id)) {
        state.favourites.push(action.payload);
      }
    },
    removeCityFromFavourites(state, action) {
      let idIndex = state.favourites.findIndex(
        (city) => city.id === action.payload
      );
      state.favourites.splice(idIndex, 1);
    },
  },
});

export const favouritesActions = favouritesSlice.actions;
export default favouritesSlice.reducer;
