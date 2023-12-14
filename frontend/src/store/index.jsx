import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { auth, usersAndProfiles } from "./auth";
import blogposts from "./blogposts";
import tags from "./tags";

const rootReducer = combineReducers({
  blogposts,
  auth,
  tags,
  usersAndProfiles,
});

let store;

if (process.env.NODE_ENV === `development`) {
  store = createStore(rootReducer, applyMiddleware(thunk, logger));
} else {
  // console.log("in", process.env.NODE_ENV);
  store = createStore(rootReducer, applyMiddleware(thunk));
}

export default store;

export * from "./auth";
export * from "./blogposts";
export * from "./tags";
