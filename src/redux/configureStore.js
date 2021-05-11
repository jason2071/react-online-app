import { applyMiddleware, createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "./reducers";

const middleware = [thunk, logger];
const initialState = {};

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cartReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const myStore = () => {
  let store = createStore(
    persistedReducer,
    initialState,
    applyMiddleware(...middleware)
  );
  let persistor = persistStore(store);
  return { store, persistor };
};

export default myStore;
