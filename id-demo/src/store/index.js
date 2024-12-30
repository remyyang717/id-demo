import { configureStore } from '@reduxjs/toolkit';
import orgValueReducer from './orgSlice'
import locationValueReducer from './locationSlice';

const store = configureStore({
    reducer: {
        orgValue: orgValueReducer,
        locationValue: locationValueReducer
    },
});

export default store;
