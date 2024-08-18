import {configureStore}  from '@reduxjs/toolkit'
import PhotoSlice from './PhotoSlice'

export const store = configureStore({
    reducer: {
        photos: PhotoSlice,
    }
});