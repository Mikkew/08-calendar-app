import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { rootReducers } from "../reducers/rootReducers";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const Store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunk))
);

export default Store;