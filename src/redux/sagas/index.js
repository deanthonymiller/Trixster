import { all, takeEvery, call, put as dispatch } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
// import FormData from 'form-data'
import axios from '../../../node_modules/axios'


export default function* rootSaga() {
  yield all([
    yield takeEvery('POST_QUESTION', postQuestion),
    yield takeEvery('GET_QUESTION', getQuestions),
    yield takeEvery('GET_THIS_QUESTION', getThisQuestion),
    yield takeEvery('POST_ANSWER',postAnswer ),
    yield takeEvery('GET_IND_QUESTION_RESPONSE', getAnswers),
    yield takeEvery('DELETE_QUESTION', deleteQuestion),
    userSaga(),
    loginSaga(),

    // watchIncrementAsync()
  ]);
}
  
  function* getThisQuestion(action){
    console.log(action.payload);
    
    try{
      const IndQuestion = yield call(axios.get,`/api/trick/question/${action.payload}`)
      yield dispatch({
        type:'GET_IND_QUESTION',
        payload: IndQuestion.data
      })
    }catch(err){

    }
    
  }

  function* getAnswers(action){
    let id = action.payload
    console.log('Question id:', id);
   
    try{
      const indQuestionAnswer = yield call(axios.get, `/api/trick/response/${id}`)
      yield dispatch({
        type:'GET_IND_QUESTION_ANSWER',
        payload:indQuestionAnswer.data
      })
    }catch(err) {
      console.log(err);
      
    }
  }

  function* postAnswer(action){
    console.log('posted answer',action.payload.id);
    let id = action.payload.id
    try{
      yield call(axios.post,'/api/trick/answer', action.payload)
      const indQuestionAnswer = yield call(axios.get, `/api/trick/response/${id}`)
      yield dispatch({
        type:'GET_IND_QUESTION_ANSWER',
        payload: indQuestionAnswer.data
      })
    }catch(err){
      console.log(err);
      
    }
    
  }

  function* getQuestions(action){  
    let userInput = action.payload.userInput
    console.log(userInput);
      try{
        const listQuestions = yield call(axios.get,`/api/trick/?search=${userInput}`)
        yield dispatch({
          type:'GET_QUESTIONS',
          payload: listQuestions.data
        })
        console.log(listQuestions.data);
        
      } catch(err){

      }
  }


  function* postQuestion(action){
    console.log('posted question', action.payload);
    try{
      yield call(axios.post, '/api/trick/', action.payload)
    }catch(err){
      console.log(err);
      
    }
   
  }

  function* deleteQuestion(action){
    console.log('here it is', action.payload.questionId);
    let question_id = action.payload.questionId
    try{
      yield call(axios.delete,`/api/trick/${question_id}`)
    }catch(err){

    }
  }


// function* postPicture(fd){
//   console.log('Grabbing Profile Picture');
  
  
//     try{
      
//       let fd = new FormData();
//       fd.append('image', this.state.profile_picture, this.state.profile_picture.name)
//       console.log(fd);
//       const pictureRes = yield call(axios.put, `/api/trick/profilePic/`,fd);
//       // will need a get request here eventually
//     } catch(err){
//       yield console.log(err);
//     }

// }