import {
  GET_ALL_REQUEST,
  GET_ALL_SUCCESS,
  GET_ALL_FAILURE,
  POST_DATA_REQUEST,
  POST_DATA_SUCCESS,
  POST_DATA_FAILURE,
  DELETE_DATA_SUCCESS,
  DELETE_DATA_REQUEST,
  DELETE_DATA_FAILURE,
  EDIT_DATA_REQUEST,
  EDIT_DATA_SUCCESS,
  EDIT_DATA_FAILURE,
  GET_ID_REQUEST,
  GET_ID_SUCCESS,
  GET_ID_FAILURE,
  SET_DELETE_STATUS,
  CLEAR_FORM_DATA,
  VIEW_DATA_REQUEST,
  VIEW_DATA_SUCCESS,
  VIEW_DATA_FAILURE,
  // LOGIN_REQUEST,
  // LOGIN_SUCCESS,
  // LOGIN_FAILURE,
} from "../../Type/type";

const initialState = {
  formData: [],
  deleteStatus: null,
  obj: null,
  error: null, // To handle failures
  viewData: null,
  // loading: false,
  // loggedIn: false,
  // username: null,
};

const productReducer = (state = initialState, action) => {
  console.log(state, action);

  switch (action.type) {
    case GET_ALL_REQUEST:
      return {
        ...state,
      };

    case GET_ALL_SUCCESS:
      return {
        ...state,
        formData: action.payload,
      };

    case GET_ALL_FAILURE:
      return {
        ...state,
        obj: null,
        error: action.payload,
      };

    case GET_ID_REQUEST:
      return {
        ...state,
        obj: action.payload,
      };

    case GET_ID_SUCCESS:
      return {
        ...state,
        obj: action.payload,
      };

    case GET_ID_FAILURE:
      return {
        ...state,
        obj: null,
        error: action.payload,
      };

    case POST_DATA_REQUEST:
      return {
        ...state,
      };

    case POST_DATA_SUCCESS:
      return {
        ...state,
        formData: [...state.formData, action.payload],
      };

    case POST_DATA_FAILURE:
      return {
        ...state,
      };

    case EDIT_DATA_REQUEST:
      return {
        ...state,
        formData: action.payload,
      };

    case EDIT_DATA_SUCCESS:
      return {
        ...state,
        formData: Array.isArray(action.payload) ? action.payload : [], // Ensure array
        error: null,
      };
    case EDIT_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_DATA_REQUEST:
      return {
        ...state,
        deleteStatus: null,
      };

    case DELETE_DATA_SUCCESS:
      return {
        ...state,
        formData: state.formData.filter((item) => item.id !== action.payload),
        deleteStatus: "success",
      };

    case DELETE_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case SET_DELETE_STATUS:
      return {
        ...state,
        deleteStatus: action.payload,
      };

    case VIEW_DATA_REQUEST:
      return {
        ...state,
        error: null,
      };

    case VIEW_DATA_SUCCESS:
      return {
        ...state,
        viewData: action.payload,
        error: null,
      };

    case VIEW_DATA_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case CLEAR_FORM_DATA:
      return initialState;

    //   case LOGIN_REQUEST:
    //     return {
    //       ...state,
    //       loading: true,
    //       error: null
    //     };
    // case LOGIN_SUCCESS:
    //     return {
    //       ...state,
    //       loading: false,
    //       loggedIn: true,
    //       username: action.payload.username,
    //       error:null,
    //      };
    // case LOGIN_FAILURE:
    //     return {
    //       ...state,
    //       loading: false,
    //       error: action.payload.error,
    //       loggedIn:false,
    //      };

    default:
      return state;
  }
};

export default productReducer;
