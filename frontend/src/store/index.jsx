import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";
import auth from "./auth";
import blogposts from "./blogposts";

const reducer = combineReducers({
  blogposts,
  auth,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./auth";
export * from "./blogposts";
