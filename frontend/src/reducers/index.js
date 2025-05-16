import { combineReducers } from "redux";
import alert from "./alert";
import authReducer from "./authReducer";
import  postTask  from "../reducers/postTaskReducer";
import showTasksReducers from "./showTasksReducers";
import particularTaskReducer from "./particularTaskReducer";
import offersReducer from "./offersReducer";
import getOffersReducer from "./getOffersReducer";
import updateOfferReducer from "./updateOfferReducer";
import completeTaskReducer from "./completeTaskReducer";
import myTasksReducer from "./myTasksReducer";
import socketReducer from "./socketReducer";
import userChatReducer from "./userChatReducer";
import messageReducer from "./messageReducer";
// import socketReducer from "./socketReducer";
export default combineReducers({
  alert:alert,
  auth:authReducer,
  postTask:postTask,
  showTask:showTasksReducers,
  particularTask:particularTaskReducer,
  offers:offersReducer,
  getOffers:getOffersReducer,
  updateOffer:updateOfferReducer,
  completeTask:completeTaskReducer,
  myTasks:myTasksReducer,
  socket:socketReducer,
  userChat:userChatReducer,
  message:messageReducer,
  
});