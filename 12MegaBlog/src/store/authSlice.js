import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    status : false,
    userData : null
}

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers:{
        login:(state,action) => {
            state.status = true;
            // console.log(action);
            // console.log(state.status)
            state.userData = action.payload.userData;
           
        },
        logout:(state,action) =>{
            state.status = false;
            state.userData = null
        }
    },
    // We can create post also here , as we created auth
    //name: "post",

})

export const {login,logout} = authSlice.actions;
export default authSlice.reducer;