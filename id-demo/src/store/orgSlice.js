import { createSlice } from '@reduxjs/toolkit';

const orgValueSlice = createSlice({
    name: 'orgValue',
    initialState: {
        value: 'Lutra',
    },
    reducers: {
        setOrgValue: (state, action) =>
        {
            state.value = action.payload;
        },
    },
});

export const { setOrgValue } = orgValueSlice.actions;
export default orgValueSlice.reducer; 