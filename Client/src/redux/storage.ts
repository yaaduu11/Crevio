import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore} from 'redux-persist'
import storage from "redux-persist/lib/storage";
import userReducer from './userSlice'
import adminReducer from './adminSlice'

const userPersistConfig = {
    key: "user",
    storage,
};

const adminPersistConfig = {
    key: "admin",
    storage,
};

const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
const persistedAdminReducer = persistReducer(adminPersistConfig, adminReducer);

const store = configureStore({
    reducer: {
        user: persistedUserReducer,
        admin: persistedAdminReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false, 
        }),
})

const persistor = persistStore(store)
export {persistor}

export type RootState = ReturnType<typeof store.getState>;
export default store