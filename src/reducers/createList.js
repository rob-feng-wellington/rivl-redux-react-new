import { combineReducers } from 'redux';

const createList = (filter) => {
  const ids = (state = [], action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch(action.type) {
      case 'RECEIVE_PLAYERS':
        return action.response.map(player => player.id);
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) =>{
    switch(action.type) {
      case 'REQUEST_PLAYERS':
        return true;
      case 'RECEIVE_PLAYERS':
        return false;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching
  })
};

export default createList;

export const getIds = (state) => state.ids;

export const getIsFetching = (state) => state.isFetching;