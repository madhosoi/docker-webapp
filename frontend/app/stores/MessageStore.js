import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';
import { ActionTypes } from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

class MessageStore extends ReduceStore {
  getInitialState() {
    return {
      data: Immutable.fromJS({
        replyMessageId: '',
        messageList: [],
      }).toOrderedMap(),
    };
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.GET_MESSAGES: {
        return {
          data: state.data.updateIn(['messageList'], () =>
            Immutable.fromJS(action.data)
          ),
        };
      }
      case ActionTypes.SET_REPLYMESSAGEID: {
        return {
          data: state.data.set('replyMessageId', action.data),
        };
      }
      default: {
        return state;
      }
    }
  }
}

export default new MessageStore(AppDispatcher);
