import { createSlice } from "@reduxjs/toolkit";
import { UserStoreType } from "../types/userTypes";

const initialState : UserStoreType = {
    _id : '',
    name : '',
    email : '',
    role : '',
    accessToken : null
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        setUser:(state, action) => {
            return {...state, ...action.payload}
        }
    }
})


export const {setUser} = userSlice.actions
export default userSlice.reducer