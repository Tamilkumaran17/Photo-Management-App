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
        update(state,action){
            const {Id,newTitle,newDes} = action.payload;

            state.photos = state.photos.map((p)=>{
                if(p.id===Id){
                    return {...p,title:newTitle,description:newDes}
                }
                else return p;
            })
        },

        initPhoto(state,action){
            state.photos = action.payload;
        }
    },
    
})

export const {addPhoto,removePhoto,initPhoto,update} = photoSlice.actions;
export default photoSlice.reducer;