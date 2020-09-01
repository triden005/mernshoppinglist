import axios from "axios";
import {GET_ITEMS,ADD_ITEMS,DELETE_ITEMS,ITEMS_LOADING} from "./Types"
import { tokenconfig } from "./AuthAction";
import { returnError } from "./ErrorAction";


export const getItems =() => dispatch=>{

    dispatch( setItemsLoading());
    axios
        .get("/api/items")
        .then(res=> dispatch({type :GET_ITEMS,payload:res.data}))
        .catch (err=>{
            dispatch(returnError(err.response,err.response.status));

        })

    

};

export const additem =(item) => (dispatch,getState)=>{

    axios
        .post("/api/items",item,tokenconfig(getState))
        .then(res=>dispatch({ type:ADD_ITEMS  , payload:res.data}))
        .catch (err=>{
            dispatch(returnError(err.response,err.response.status));
            
        })
};

export const deleteitem =(id)=>(dispatch,getState)=>{
    axios
        .delete(`api/items/${id}`,tokenconfig(getState))
        .then(res=>
            dispatch({
            type:DELETE_ITEMS,
            payload:id
        }))
        .catch (err=>{
            dispatch(returnError(err.response,err.response.status));
            
        })

};



export const setItemsLoading = () =>{
    return {
        type: ITEMS_LOADING
    }
}