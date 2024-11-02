// counterReducer.js
// redux/reducers/counterReducer.js
import { INCREMENT, DECREMENT, SET_MOOD_COUNT } from "../redux/actions";

const initialState = {
  moodCount: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, moodCount: state.moodCount + 1 };
    case DECREMENT:
      return { ...state, moodCount: state.moodCount - 1 };
    case SET_MOOD_COUNT:
      return { ...state, moodCount: action.payload };
    default:
      return state;
  }
};

export default counterReducer;
