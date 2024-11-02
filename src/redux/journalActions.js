// src/redux/journalActions.js
import axios from "axios";

// Action Types
export const FETCH_JOURNAL_ENTRIES_REQUEST = "FETCH_JOURNAL_ENTRIES_REQUEST";
export const FETCH_JOURNAL_ENTRIES_SUCCESS = "FETCH_JOURNAL_ENTRIES_SUCCESS";
export const FETCH_JOURNAL_ENTRIES_FAILURE = "FETCH_JOURNAL_ENTRIES_FAILURE";

export const ADD_JOURNAL_ENTRY_REQUEST = "ADD_JOURNAL_ENTRY_REQUEST";
export const ADD_JOURNAL_ENTRY_SUCCESS = "ADD_JOURNAL_ENTRY_SUCCESS";
export const ADD_JOURNAL_ENTRY_FAILURE = "ADD_JOURNAL_ENTRY_FAILURE";

// Action Creators

// Fetch Journal Entries
export const fetchJournalEntries = () => async (dispatch) => {
  dispatch({ type: FETCH_JOURNAL_ENTRIES_REQUEST });
  try {
    const response = await axios.get(
      `${
        process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api"
      }/journals`
    );
    dispatch({
      type: FETCH_JOURNAL_ENTRIES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_JOURNAL_ENTRIES_FAILURE,
      payload: error.message,
    });
  }
};

// Add Journal Entry
export const addJournalEntry = (entry) => async (dispatch) => {
  dispatch({ type: ADD_JOURNAL_ENTRY_REQUEST });
  try {
    const response = await axios.post(
      `${
        process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api"
      }/journals`,
      entry
    );
    dispatch({
      type: ADD_JOURNAL_ENTRY_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ADD_JOURNAL_ENTRY_FAILURE,
      payload: error.message,
    });
  }
};
