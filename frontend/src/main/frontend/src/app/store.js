import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import { persistStore, persistReducer } from "redux-persist";
import storageSession from 'redux-persist/lib/storage/session'
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
const persistConfig = {
  key: "root",
  storage:storageSession,
  whitelist: ['userReducer']
};
const reducer = combineReducers({
    userReducer,
})

const persistReducer_ = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistReducer_,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);
export default store
