import { takeLatest, call, put } from "redux-saga/effects";
import * as type from "../../Type/type";
import {
  getAll,
  getId,
  postItem,
  putItem,
  deleteItem,
  viewItem,
} from "../../../Services/mockApi";

import {
  getAllSuccess,
  getAllFailure,
  getIdSucess,
  getIdFailure,
  postDataSuccess,
  postDataFailure,
  editDataSuccess,
  editDataFailure,
  deleteDataSuccess,
  deleteDataFailure,
  viewDataSuccess,
  viewDataFailure,
  // loginSuccess,
  // loginFailure,
} from "../../Action/action";
function* getAllApi() {
  try {
    const res = yield call(getAll);
    if (res.status === 200 || res.status === 201) {
      yield put(getAllSuccess(res.data));
    } else {
      yield put(getAllFailure("Failed with status: " + res.status));
    }
  } catch (error) {
    yield put(getAllFailure(error.message));
  }
}

function* getIdApi(action) {
  try {
    const res = yield call(getId, action.payload);
    if (res.status === 200 || res.status === 201) {
      yield put(getIdSucess(res.data));
    } else {
      yield put(getIdFailure("Failed with status: " + res.status));
    }
  } catch (error) {
    yield put(getIdFailure(error.message));
  }
}


function* postApi({ payload }) {
  // try {
    const res = yield call(postItem, payload);
    console.log(res);

    if (res.status === 201) {
      yield put(postDataSuccess(res.data));
    } else {
      yield put(postDataFailure("Failed"));
    }
  }

  function* editApi({ payload }) {
    try {
      const res = yield call(putItem, payload, payload.id);
      console.log("Update response:", res);
  
      if (res.status === 200 || res.status === 201) {
        yield put(editDataSuccess(res.data)); 
      } else {
        yield put(editDataFailure("Update failed with status: " + res.status)); // Handle non-2xx responses
      }
    } catch (error) {
      console.error("Edit error:", error); 
      yield put(editDataFailure(error.message)); 
    }
  }
  

function* deleteApi(action) {
  try {
    const id = action.payload; 
    console.log("Deleting item with ID:", id);

    const res = yield call(deleteItem, id); 

    if (res.status === 200 || res.status === 204) {
     
      yield put(deleteDataSuccess(id));
    } else {
 
      yield put(deleteDataFailure("Delete failed with status: " + res.status));
    }
  } catch (error) {

    yield put(deleteDataFailure(error.message));
  }
}

// function* viewApi(action) {
//   try {
//     const id = action.payload; // Accessing the ID from the payload
//     console.log("ID being passed to viewItem:", id); 

//     if (!id) {
//       throw new Error("Invalid ID type");
//     }

//     const res = yield call(viewItem, id); // Ensure this function handles the ID properly

//     if (res.status === 200) {
//       yield put(viewDataSuccess(res.data)); // Assuming your API response structure is correct
//     } else {
//       yield put(viewDataFailure("Failed with status: " + res.status)); 
//     }
//   } catch (error) {
//     yield put(viewDataFailure(error.message)); 
//   }
// }

function* viewApi(action) {
  try {
      const { id, viewData } = action.payload; // Accessing the ID and viewData from the payload
      console.log("ID being passed to viewItem:", id); // Should log the correct ID

      if (!id) {
          throw new Error("Invalid ID type");
      }

      // Call the API function to get data using the ID
      const res = yield call(viewItem, id); 

      if (res.status === 200) {
          // If successful, include viewData in the success action
          yield put(viewDataSuccess({ ...res.data, ...viewData })); 
      } else {
          yield put(viewDataFailure("Failed with status: " + res.status)); 
      }
  } catch (error) {
      yield put(viewDataFailure(error.message)); 
  }
}



// function* loginSaga(action) {
//   const { username, password } = action.payload;
//   console.log('Attempting login with:', username, password); // Log the credentials

//   try {
//       if (username === 'luffy@thepirate' && password === 'mugiwara123') {
//           yield put(loginSuccess(username));
//       } else {
//           console.error('Login failed: Invalid credentials');
//           yield put(loginFailure('Invalid credentials'));
//       }
//   } catch (error) {
//       console.error('Login error:', error);
//       yield put(loginFailure(error.message));
//   }
// }



function* StudentWatcherSaga() {
  yield takeLatest(type.GET_ALL_REQUEST, getAllApi);
  yield takeLatest(type.GET_ID_REQUEST, getIdApi);
  yield takeLatest(type.POST_DATA_REQUEST, postApi);
  yield takeLatest(type.EDIT_DATA_REQUEST, editApi);
  yield takeLatest(type.DELETE_DATA_REQUEST, deleteApi);
  yield takeLatest(type.VIEW_DATA_REQUEST, viewApi);
  // yield takeLatest(type.LOGIN_REQUEST, loginSaga);
}
export default StudentWatcherSaga;
