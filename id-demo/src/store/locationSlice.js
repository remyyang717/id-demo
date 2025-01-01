import { createSlice } from '@reduxjs/toolkit';

const locationValueSlice = createSlice({
    name: 'locationValue',
    initialState: {
        value: 'Auckland',
    },
    reducers: {
        setLocationValue: (state, action) =>
        {
            state.value = action.payload;
        },
    },
});

export const { setLocationValue } = locationValueSlice.actions;
export default locationValueSlice.reducer; 