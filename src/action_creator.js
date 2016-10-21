import { getIsFetching } from './reducer';
import * as api from './api';

export const fetchPlayers = (filter) => (dispatch, getState) => {
  if(getIsFetching(getState(), filter)){
    return Promise.resolve();
  }

  dispatch({
    type: 'FETCH_PLAYERS_REQUEST',
    filter
  });

  return api.fetchPlayers(filter).then(
    response => {
      dispatch({
        type: 'FETCH_PLAYERS_SUCCESS',
        filter,
        response
      });
    },
    error => {
      dispatch({
        type: 'FETCH_PLAYERS_FAILURE',
        filter,
        message: error.message || 'Something went wrong.'
      });
    }
  );
};

export const addPlayer = (player)  => (dispatch) => {
  return api.addPlayer(player).then(response => {
    dispatch({
      type: 'ADD_PLAYER_SUCCESS',
      response
    });
  }); 
};

export const updateScore = (id) => (dispatch) => {
  return api.updateScore(id).then(response => {
    dispatch({
      type: 'UPDATE_SCORE_SUCCESS',
      response
    });
  }); 
};
