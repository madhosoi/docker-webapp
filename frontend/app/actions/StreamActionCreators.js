import axios from "axios"; // @see https://www.npmjs.com/package/axios
import AppDispatcher from "../dispatcher/AppDispatcher";
import { ActionTypes } from "../constants/AppConstants";
import config from "../config";
import Querystring from "querystring";

const api = axios.create({
  baseURL: config.apiServer.url
});

const data = {
  "grant_type": "client_credentials",
  "scope": "public",
  "client_id": config.apiServer.user,
  "client_secret": config.apiServer.pwd
};

var USER_TOKEN = "";

const StreamActionCreators = {
  getStreamList({ resolve, reject }) {
    if (USER_TOKEN == ""){
      axios.post(config.apiServer.url_token + '/accesstoken?grant_type=client_credentials', Querystring.stringify(data))   
      .then(response => {
        console.log(response.data);
        USER_TOKEN = response.data.access_token;
        console.log('userresponse ' + response.data.access_token); 
      })   
      .catch((error) => {
        console.log('error ' + error);   
      });
    };
    axios
      .get(config.apiServer.url + "/chat_streams", { headers: { 'Authorization' : 'Bearer ' + USER_TOKEN } })
      .then(response => {
        AppDispatcher.dispatch({
          type: ActionTypes.GET_STREAMS,
          data: response.data
        });

        resolve();
      })
      .catch(error => {
        reject(error);
        console.log('error with ' + USER_TOKEN );
        USER_TOKEN = "";
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
