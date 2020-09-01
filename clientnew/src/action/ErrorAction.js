import {GET_ERRORS,CLEAR_ERRORS} from "./Types";


export const returnError = (msg,status,id = null)=>{
    return {
        type:GET_ERRORS,
        payload:{msg,status,id}
    }
}

export const clearErrors = () =>{
    return  { 
        type : CLEAR_ERRORS
    };
};