import axios from "axios"; // @see https://www.npmjs.com/package/axios
import AppDispatcher from "../dispatcher/AppDispatcher";
import { ActionTypes } from "../constants/AppConstants";
import config from "../config";

const api = axios.create({
  baseURL: config.apiServer.url
});

const StreamActionCreators = {
  getStreamList({ resolve, reject }) {
    api
      .get("/chat_streams")
      .then(response => {
        AppDispatcher.dispatch({
          type: ActionTypes.GET_STREAMS,
          data: response.data
        });

        resolve();
      })
      .catch(error => {
        reject(error);
      });
  },
  createStream({ name, resolve, reject }) {
    api
      .post("/chat_streams", { name })
      .then(response => {
        AppDispatcher.dispatch({
          type: ActionTypes.CREATE_STREAM,
          data: response.data
        });

        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  },
  selectStream(stream) {
    AppDispatcher.dispatch({
      type: ActionTypes.SELECT_STREAM,
      data: stream
    });
  }
};

export default StreamActionCreators;
