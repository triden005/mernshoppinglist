import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL} from "../action/Types";

const initialState = {
    token:localStorage.getItem("token"),
    isAuthenticated:null,
    isloading:false,
    user:null
};

export default function(state= initialState ,action){
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isloading:true,
            };
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                isloading:false,
                user: action.payload.user
            }
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem("token",action.payload.token);
            return{
                ...state,
                ...action.payload,
                isAuthenticated:true,
                isloading:false,
            }
        case AUTH_ERROR:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
            localStorage.removeItem("token");
            return{
                ...state,
                token:null,
                user:null,
                isAuthenticated:false,
                isloading:false,
            }
        default:
            return state;

    }
}