import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import { deflate } from 'zlib';

const questionItems = (state = [{}], action) => {
  switch(action.type){
    case 'GET_QUESTIONS':
      return action.payload
    // case 'GET_IND_QUESTION':
    //   return action.payload
    // case 'DELETE_IND_QUESTION':
    //   return   
    case 'POST_IND_ANSWER':
      return action.payload
    // case 'GET_IND_QUESTION_ANSWER':
    //   return [...state, action.payload] 
    // case 'POST_QUESTION':
    //   return [...state, action.payload]
    default:
      return state
  }
 }

 const indQuestion = (state = [], action) => {
   switch(action.type){
     
    case 'POST_QUESTION':
    return [...state, action.payload]
  default:
    return state
   }
 }

const correctStuff = (state = [{}], action) =>{
  switch( action.type){
    case 'GET_IND_QUESTION':
      return action.payload
      default:
        return state
  }
}

 const answerItems = ( state = [], action) => {
   switch(action.type){
    case 'GET_IND_QUESTION_ANSWER':
      return action.payload
    default:
      return state
   }
 }

 const userQuestions = ( state = [{}], action) =>{
  switch(action.type){
    case 'GET_STUFF':
      return action.payload
    default:
      return state
    
  }
 }

const store = combineReducers({
  user,
  login,
  questionItems,
  answerItems,
  userQuestions,
  correctStuff
});

export default store;
