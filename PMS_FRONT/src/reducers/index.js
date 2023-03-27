import { combineReducers } from "redux";

import auth from "./auth";
import message from "./message";
import adminPage from "../components/AdminPage/reducer"
import workspace from "../components/WorkSpacePage/reducer";
import backlog from "../components/WorkSpacePage/BacklogPage/reducer"



export default combineReducers({
  auth,
  message,
  adminPage,
  workspace,
  backlog
});
