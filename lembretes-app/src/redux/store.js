
import { createStore, applyMiddleware  } from "redux";
import thunk from "redux-thunk";
import lembretesReducer from "./reducers";

const store = createStore(lembretesReducer, applyMiddleware(thunk));

export default store;