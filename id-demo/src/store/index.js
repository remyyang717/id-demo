import { configureStore } from '@reduxjs/toolkit';
import orgValueReducer from './orgSlice'

const store = configureStore({
    reducer: {
        orgValue: orgValueReducer
    },
});

export default store;
