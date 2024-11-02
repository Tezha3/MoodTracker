// src/redux/journalReducer.js
import {
  FETCH_JOURNAL_ENTRIES_REQUEST,
  FETCH_JOURNAL_ENTRIES_SUCCESS,
  FETCH_JOURNAL_ENTRIES_FAILURE,
  ADD_JOURNAL_ENTRY_REQUEST,
  ADD_JOURNAL_ENTRY_SUCCESS,
  ADD_JOURNAL_ENTRY_FAILURE,
} from "./journalActions";

const initialState = {
  loading: false,
  entries: [],
  error: null,
};

const journalReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOURNAL_ENTRIES_REQUEST:
    case ADD_JOURNAL_ENTRY_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_JOURNAL_ENTRIES_SUCCESS:
      return {
        ...state,
        loading: false,
        entries: action.payload,
      };
    case ADD_JOURNAL_ENTRY_SUCCESS:
      return {
        ...state,
        loading: false,
        entries: [...state.entries, action.payload],
      };
    case FETCH_JOURNAL_ENTRIES_FAILURE:
    case ADD_JOURNAL_ENTRY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default journalReducer;
