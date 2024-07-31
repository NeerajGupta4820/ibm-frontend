import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  watchlistItems: [],
};
const loadWatchlistState = () => {
  try {
    const watchlistState = localStorage.getItem("watchlistState");
    return watchlistState ? JSON.parse(watchlistState) : initialState;
  } catch (error) {
    console.error("Error loading watchlist state from localStorage:", error);
    return initialState;
  }
};
const saveWatchlistState = (state) => {
  try {
    localStorage.setItem("watchlistState", JSON.stringify(state));
  } catch (error) {
    console.error("Error saving watchlist state to localStorage:", error);
  }
};
const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: loadWatchlistState(),
  reducers: {
    addToWatchlist: (state, action) => {
      state.loading = true;
      const item = action.payload;
      const index = state.watchlistItems.findIndex(
        (i) => i.tutorId === item.tutorId && i.userId === item.userId
      );

      if (index !== -1) {
        state.watchlistItems[index] = item;
      } else {
        state.watchlistItems.push(item);
      }

      state.loading = false;
      saveWatchlistState(state);
    },
    removeFromWatchlist: (state, action) => {
      state.loading = true;
      const { tutorId, userId } = action.payload;
      state.watchlistItems = state.watchlistItems.filter(
        (i) => i.tutorId !== tutorId || i.userId !== userId
      );
      state.loading = false;
      saveWatchlistState(state);
    },
  },
});

export const { addToWatchlist, removeFromWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;
