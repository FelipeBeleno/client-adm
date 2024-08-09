// redux/slices/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Definir la interfaz para el estado del contador
interface CounterState {
    value: number;
}

// Estado inicial del contador
const initialState: CounterState = {
    value: 0,
};

// Crear el slice para el contador
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        // Acción para incrementar el contador
        increment: (state) => {
            state.value += 1;
        },
        // Acción para decrementar el contador
        decrement: (state) => {
            state.value -= 1;
        },
        // Acción para incrementar el contador por una cantidad específica
        incrementByAmount: (state, action: PayloadAction<number>) => {
            state.value += action.payload;
        },
    },
});

// Exportar las acciones generadas
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Exportar el reducer del slice
export default counterSlice.reducer;
