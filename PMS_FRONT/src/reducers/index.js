import { combineReducers } from "redux";
import auth from "./auth";
import session from "../components/Main/reducer";
import message from "./message";
import home from "../components/HomePage/reducer";
import forum from "../components/ForumPage/reducer";
import chat from "../components/ChatPage/reducer";
import adminPage from "../components/AdminPage/reducer"



export default combineReducers({
  auth,
  session,
  message,
  homeReducer: home,
  forumReducer: forum,
  chat: chat,
  adminPage
});
