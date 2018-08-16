import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';

const questionItems = (state = [], action) => {
  switch(action.type){
    case 'GET_QUESTIONS':
      return action.payload
    case 'POST_QUESTION':
      return [...state, action.payload]
    default:
      return state
  }
}


const store = combineReducers({
  user,
  login,
  questionItems,
});

export default store;
