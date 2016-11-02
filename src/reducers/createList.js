import { combineReducers } from 'redux';

const createList = (filter) => {
  const ids = (state = [], action) => {
    switch(action.type) {
      case 'FETCH_PLAYERS_SUCCESS':
        return filter === action.filter ? 
          action.response.result :
          state;
      case 'ADD_PLAYER_SUCCESS':
        return filter === action.response.gender || filter === 'all' ?
          [...state, action.response.result] :
          state;
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) =>{
    switch(action.type) {
      case 'FETCH_PLAYERS_REQUEST':
        return true;
      case 'FETCH_PLAYERS_SUCCESS':
      case 'FETCH_PLAYERS_FAILURE':
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    if(action.filter !== filter) {
      return state;
    }

    switch(action.type) {
      case 'FETCH_PLAYERS_FAILURE':
        return action.message;
      case 'FETCH_PLAYERS_SUCCESS':
      case 'FETCH_PLAYERS_REQUEST':
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    ids,
    isFetching,
    errorMessage
  })
};

export default createList;

export const getIds = (state) => state.ids;

export const getIsFetching = (state) => state.isFetching;

export const getErrorMessage = (state) => state.errorMessage;