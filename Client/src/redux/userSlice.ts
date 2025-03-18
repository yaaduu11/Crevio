import { createSlice } from "@reduxjs/toolkit";
import { UserStoreType } from "../types/userTypes";

const initialState : UserStoreType = {
    _id : '',
    name : '',
    email : '',
    role : '',
    accessToken : null,
    showToast: null
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setUser:(state, action) => {
            return {...state, ...action.payload}
        },
        removeUser:() => {
            return initialState
        },
    }
})


export const {setUser, removeUser} = userSlice.actions
export default userSlice.reducer