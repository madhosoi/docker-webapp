import { ReduceStore } from 'flux/utils';
import Immutable from 'immutable';
import { ActionTypes } from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

class StreamStore extends ReduceStore {
  getInitialState() {
    return {
      data: Immutable.fromJS({
        currentStream: {},
        streamList: [],
      }).toOrderedMap(),
    };
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.GET_STREAMS: {
        return {
          data: state.data.set('streamList', Immutable.fromJS(action.data)),
        };
      }
      case ActionTypes.CREATE_STREAM: {
        const newStream = Immutable.fromJS(action.data);
        return {
          data: state.data
            .updateIn(['currentStream'], () => newStream)
            .updateIn(['streamList'], list => list.push(newStream)),
        };
      }
      case ActionTypes.SELECT_STREAM: {
        return {
          data: state.data.updateIn(['currentStream'], () =>
            Immutable.fromJS(action.data)
          ),
        };
      }
      default: {
        return state;
      }
    }
  }
}

export default new StreamStore(AppDispatcher);
