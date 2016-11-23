import { normalize } from 'normalizr';
import * as schema from './schema';
import { getIsFetching } from './reducer';
import * as api from './api';
import { hashHistory } from 'react-router'

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
        response: normalize(response, schema.arrayOfPlayers)
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
      response: normalize(response, schema.player)
    });
    hashHistory.push('/');
  }); 
};

export const updateScore = (id) => (dispatch) => {
  return api.updateScore(id).then(response => {
    dispatch({
      type: 'UPDATE_SCORE_SUCCESS',
      response: normalize(response, schema.player)
    });
  }); 
};

export const initialBattle = () => (dispatch) => {
  dispatch({
    type: 'INITIAL_BATTLE',
  });
}

export const playerSelect = (whichPlayer, id) => (dispatch) => {
  let data = {};
  data[whichPlayer] = id;
  dispatch({
    type: 'BATTLE_PLAYER_SELECT',
    data: data
  });
}

export const addResults = (whichPlayerWin) => (dispatch) => {
  dispatch({
    type: 'ADD_BATTLE_RESULT',
    data: whichPlayerWin
  });
}

export const removeResult = (index) => (dispatch) => {
  debugger;
}
