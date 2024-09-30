import * as type from "../Type/type";

export const getAllRequest = () => {
  return {
    type: type.GET_ALL_REQUEST,
  };
};

export const getAllSuccess = (data) => {
  return {
    type: type.GET_ALL_SUCCESS,
    payload: data,
  };
};

export const getAllFailure = (err) => {
  return {
    type: type.GET_ALL_FAILURE,
    payload: err,
  };
};

export const getIdRequest = (id) => {
  return {
    type: type.GET_ID_REQUEST,
    payload: id,
  };
};

export const getIdSucess = (data) => {
  return {
    type: type.GET_ID_SUCCESS,
    payload: data,
    
  };
};

export const getIdFailure = (err) => {
  return {
    type: type.GET_ID_FAILURE,
    payload: err,
  };
};


export const clearFormData=()=>{
  return{
    type:type.CLEAR_FORM_DATA,
  }
}

export const postDataRequest = (data) => {
  return {
    type: type.POST_DATA_REQUEST,
    payload: data,
  };
};

export const postDataSuccess = (data) => {
  return {
    type: type.POST_DATA_SUCCESS,
    payload: data,
  };
};

export const postDataFailure = (err) => {
  return {
    type: type.POST_DATA_FAILURE,
    payload: err,
  };
};

export const editDataRequest = (data) => {
  return {
    type: type.EDIT_DATA_REQUEST,
    payload: data,
  };
};

export const editDataSuccess = (data,id) => {
  return {
    type: type.EDIT_DATA_SUCCESS,
    payload: data,
    // id:id,
  };
};

export const editDataFailure = (data) => {
  return {
    type: type.EDIT_DATA_FAILURE,
    payload: data,
  };
};

export const deleteDataRequest = (id) => {
  return {
    type: type.DELETE_DATA_REQUEST,
    payload:id,
  };
};

export const deleteDataSuccess = (id) => {
  return {
    type: type.DELETE_DATA_SUCCESS,
    payload:id,
  };
};

export const deleteDataFailure = (err) => {
  return {
    type: type.DELETE_DATA_FAILURE,
    payload:err,
  };
};

export const viewDataRequest = (payload) => {
  return {
    type: type.VIEW_DATA_REQUEST,
    payload,
  };
};

export const viewDataSuccess = (viewData) => {
  return {
    type: type.VIEW_DATA_SUCCESS,
    payload: viewData,
  };
};

export const viewDataFailure = (err) => {
  return {
    type: type.VIEW_DATA_FAILURE,
    payload: err,
  };
};

// export const loginRequest = (credentials) => ({
//   type: 'LOGIN_REQUEST',
//   payload: credentials,
// });



// export const loginSuccess = (username) => ({
//   type: type.LOGIN_SUCCESS,
//   payload: { username },
// });

// export const loginFailure = (error) => ({
//   type: type.LOGIN_FAILURE,
//   payload: { error },
// });


