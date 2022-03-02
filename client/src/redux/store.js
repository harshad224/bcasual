import { configureStore, combineReducers } from "@reduxjs/toolkit";
import cartReducer from "./cartRedux"
import { loginReducer } from "./loginRedux";
import { signupReducer } from "./signupRedux";
import {
    persistStore,
    persistReducer,
    FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({ cart: cartReducer, logins: loginReducer })
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: {
        user: persistedReducer, signups: signupReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),


})

export const persistor = persistStore(store)