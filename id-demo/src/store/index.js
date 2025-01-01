import { configureStore } from '@reduxjs/toolkit';
import orgValueReducer from './orgSlice'
import locationValueReducer from './locationSlice';
import moduleValueReducer from './moduleSlice'

const store = configureStore({
    reducer: {
        orgValue: orgValueReducer,
        locationValue: locationValueReducer,
        moduleValue: moduleValueReducer
    },
});

export default store;
