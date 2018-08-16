import { all, takeEvery, call, put as dispatch } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
// import FormData from 'form-data'
import axios from '../../../node_modules/axios'


export default function* rootSaga() {
  yield all([
    yield takeEvery('POST_QUESTION', postQuestion),
    yield takeEvery('GET_QUESTION', getQuestions),
    userSaga(),
    loginSaga(),

    // watchIncrementAsync()
  ]);
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