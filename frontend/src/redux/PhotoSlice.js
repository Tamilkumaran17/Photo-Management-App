import { createSlice } from "@reduxjs/toolkit";
// import { content } from "../content";

const photoSlice = createSlice({
    name: "photos",
    initialState: {
        photos: []
    },
    reducers: {
        addPhoto(state, action) {
            state.photos.push(action.payload);
        },
        removePhoto(state,action){
            state.photos = state.photos.filter((photo,index) => index !== action.payload)

        },

        initPhoto(state,action){
            state.photos = action.payload;
        }
    },
    
})

export const {addPhoto,removePhoto,initPhoto} = photoSlice.actions;
export default photoSlice.reducer;