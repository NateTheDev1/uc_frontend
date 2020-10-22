import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

import reducer from "./services/reducer";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(logger)));

export default store;
