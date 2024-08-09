import { createSlice } from "@reduxjs/toolkit";


interface LoaderState {
    state: boolean;
}


const initialState: LoaderState = {
    state: false
};


export const loaderSlice = createSlice({
    name: 'laoder',
    initialState,
    reducers: {
        loaderOff: (state) => {
            state.state = false;
        },
        loaderOn: (state) => {
            state.state = true;
        }
    }
});

export const { loaderOff, loaderOn } = loaderSlice.actions;

export default loaderSlice.reducer;