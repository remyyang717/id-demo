import { createSlice } from '@reduxjs/toolkit';

const moduleValueSlice = createSlice({
    name: 'moduleValue',
    initialState: {
        value: 'Home',
    },
    reducers: {
        setModuleValue: (state, action) =>
        {
            state.value = action.payload;
        },
    },
});

export const { setModuleValue } = moduleValueSlice.actions;
export default moduleValueSlice.reducer; 