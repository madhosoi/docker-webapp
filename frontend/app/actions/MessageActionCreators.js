import axios from "axios"; // @see https://www.npmjs.com/package/axios
import AppDispatcher from "../dispatcher/AppDispatcher";
import { ActionTypes } from "../constants/AppConstants";
import config from "../config";

const api = axios.create({
  baseURL: config.apiServer.url
});

const MessageActionCreators = {
  getMessages({ streamId, resolve, reject }) {
    api
      .get("/chat_messages", {
        params: {
          filter: {
            where: {
              stream_id: streamId
            }
          }
        }
      })
      .then(response => {
        AppDispatcher.dispatch({
          type: ActionTypes.GET_MESSAGES,
          data: response.data
        });

        resolve();
      })
      .catch(error => {
        reject(error);
      });
  },
  sendMessage({ streamId, userId, message, replyMessageId, resolve, reject }) {
    api
      .post("/chat_messages", {
        stream_id: streamId,
        user_id: userId,
        message,
        replyMessage_id: replyMessageId
      })
      .then(() => {
        this.getMessages({ streamId });
        resolve();
      })
      .catch(error => {
        reject(error);
      });
  },
  selectMessageForReply({ replyMessageId }) {
    AppDispatcher.dispatch({
      type: ActionTypes.SET_REPLYMESSAGEID,
      data: replyMessageId
    });
  }
};

export default MessageActionCreators;
