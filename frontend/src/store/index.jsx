import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";
import auth from "./auth";
import blogposts from "./blogposts";
import tags from "./tags";

const reducer = combineReducers({
  blogposts,
  auth,
  tags,
});

let store;

if (process.env.NODE_ENV === `development`) {
  console.log("in", process.env.NODE_ENV);
  store = createStore(reducer, applyMiddleware(thunk, logger));
} else {
  console.log("in", process.env.NODE_ENV);
  store = createStore(reducer, applyMiddleware(thunk));
}

export default store;

export * from "./auth";
export * from "./blogposts";
export * from "./tags";
