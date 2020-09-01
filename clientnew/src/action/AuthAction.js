import axios from "axios";
import { returnError } from "./ErrorAction";

import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL} from "./Types";

//check token and loader
export const loaduser = () =>(dispatch,getState) =>{
    //user loading
    dispatch({type :USER_LOADING});
    //get token from localstorage
    axios.get("/api/auth/user",tokenconfig(getState))
        .then(res=>dispatch({
            type:USER_LOADED,
            payload:res.data
        }))
        .catch(err =>{
            dispatch(returnError(err.response.data,err.response.status));
            dispatch({type:AUTH_ERROR})
        })
}

//register user
export const register = ({name ,email,password})=>(dispatch)=>{

    //Header
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({name,email,password})

    axios.post("/api/users",body,config)
        .then(res=> dispatch 
            ({type:REGISTER_SUCCESS,
                    payload:res.data}))
        .catch(err =>{
            dispatch(returnError(err.response.data,err.response.status,"REGISTER_FAIL"));
            dispatch({
                type:REGISTER_FAIL,

            })
        })
}
//login USer
export const login = ({email,password})=>(dispatch)=>{

    //Header
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email,password})

    axios.post("/api/auth",body,config)
        .then(res=> dispatch 
            ({type:LOGIN_SUCCESS,
                    payload:res.data}))
        .catch(err =>{
            dispatch(returnError(err.response.data,err.response.status,"LOGIN_FAIL"));
            dispatch({
                type:LOGIN_FAIL,

            })
        })
}


/////logout user
export const logout =() => {
    return {
        type:LOGOUT_SUCCESS
    }
}













///setup config header and token
export const tokenconfig = (getState)=>{

    const token = getState().auth.token;

    const config = {
        headers:{
            "Content-type": "application/json"
        }
    }

    if(token) {
        config.headers["x-auth-token"] = token;
    }
    return config;

}