
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice'
import loaderReducer from './slices/laoderSlice'

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        loader: loaderReducer,
    },
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
