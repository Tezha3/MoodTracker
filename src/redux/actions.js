import { createAsyncThunk } from "@reduxjs/toolkit";

export const INCREMENT = "COUNTER_INCREMENT";
export const DECREMENT = "COUNTER_DECREMENT";
export const SET_MOOD_COUNT = "SET_MOOD_COUNT";

export const increment = () => ({
  type: INCREMENT,
});

export const decrement = () => ({
  type: DECREMENT,
});

export const setMoodCount = (count) => ({
  type: SET_MOOD_COUNT,
  payload: count,
});

export const fetchImpactsData = createAsyncThunk(
  "moods/fetchImpactsData",
  async () => {
    const response = await fetch("/impacts.json");
    if (!response.ok) {
      throw new Error("Failed to fetch impacts data");
    }
    const data = await response.json();
    return data;
  }
);
