// src/sagas/index.js
import { all } from 'redux-saga/effects';
// import formSaga from './formSaga';
import StudentWatcherSaga from '../Saga/SagaReducer/ComponentSaga';

function* rootSaga() {
  yield all([StudentWatcherSaga()]);
}
export default rootSaga;