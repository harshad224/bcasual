import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    product: [],
    quantity: 0,
    total: 0,
}
export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // addQuantity: (state) => {

        // },
        addProduct: (state, action) => {
            state.product.push(action.payload);
            state.quantity += 1;
            state.total += (action.payload.price * action.payload.amount)
        },
        deleteProduct: (state, action) => {
            const index = state.product.findIndex(prod => prod._id === action.payload)
            state.quantity -= 1;
            state.total -= state.product[index].price * state.product[index].amount;
            state.product.splice(index, 1)
        }
    }
})



export default cartSlice.reducer;
export const { addProduct, deleteProduct } = cartSlice.actions