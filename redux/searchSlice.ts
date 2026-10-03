import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Category } from "@/Types/FilterCategoryMainPageWithDetails.types";

interface SearchState {
  page: number;
  category?: number[];
  categories: Category[];
  priceMin?: number;
  priceMax?: number;
  roomsMin?: number;
  ratingMin?: number;

  checkIn: string;
  checkOut: string;
}

const initialState: SearchState = {
  page: 1,
  category: [],
  categories: [],
  priceMin: undefined,
  priceMax: undefined,
  roomsMin: undefined,
  ratingMin: undefined,

  checkIn: "",
  checkOut: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,

  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },

    setCategory: (state, action: PayloadAction<number[] | undefined>) => {
      state.category = action.payload;
      state.page = 1;
    },

    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },

    setPriceRange: (
      state,
      action: PayloadAction<{
        min?: number;
        max?: number;
      }>,
    ) => {
      state.priceMin = action.payload.min;
      state.priceMax = action.payload.max;
      state.page = 1;
    },

    setRoomRange: (state, action: PayloadAction<number | undefined>) => {
      state.roomsMin = action.payload;
      state.page = 1;
    },

    setRatingMin: (state, action: PayloadAction<number | undefined>) => {
      state.ratingMin = action.payload;
    },

    setSearchDates: (
      state,
      action: PayloadAction<{
        checkIn: string;
        checkOut: string;
      }>,
    ) => {
      state.checkIn = action.payload.checkIn;
      state.checkOut = action.payload.checkOut;
    },

    clearSearchDates: (state) => {
      state.checkIn = "";
      state.checkOut = "";
    },
  },
});

export const {
  setPage,
  setCategory,
  setCategories,
  setPriceRange,
  setRoomRange,
  setRatingMin,
  setSearchDates,
  clearSearchDates,
} = searchSlice.actions;

export default searchSlice.reducer;
