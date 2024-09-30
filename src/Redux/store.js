import {
            legacy_createStore as createStore,
            compose,
            applyMiddleware,
          } from "redux";
import createSagaMiiddleware from 'redux-saga';
import rootReducer from "./Reducer";
import rootSaga from "./Saga";


const composeEnhancers= window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;

const saga = createSagaMiiddleware();

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(saga))
  );
  
  saga.run(rootSaga);