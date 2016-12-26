import { normalize } from 'normalizr';
import * as schema from './schema';
import { getIsFetching, getBattleNewScores } from './reducer';
import * as api from './api';
import { hashHistory } from 'react-router';
import Elo from 'elo-js';

import forEach from 'lodash/forEach';
import clone from 'lodash/clone';

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

export const fetchPlayer = (id) => (dispatch) => {
  dispatch({
    type: 'FETCH_PLAYER_REQUEST'
  });

  return api.fetchPlayer(id).then(
    response => {
      dispatch({
        type: 'FETCH_PLAYER_SUCCESS',
        data: response
      });
    }
  );
}

export const addPlayer = (player)  => (dispatch) => {
  dispatch({
    type: 'ADD_PLAYER_REQUEST'
  });

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

export const removeResult = (whichResult) => (dispatch) => {
  dispatch({
    type: 'REMOVE_BATTLE_RESULT',
    data: whichResult
  });
}

export const submitScore = (playerA, playerB, results) => (dispatch, getState) => {
  
  let games = [];
  let xhrs = [];
  let elo = new Elo();
  let newPlayerAScore, newPlayerBScore;
  let playerAObj = clone(playerA);
  let playerBObj = clone(playerB);
  let playerAScore = playerAObj.score;
  let playerBScore = playerBObj.score;

  forEach(results, function(result) {
    let gameA = {};
    let gameB = {};
    if(result === 'playerA') {
      gameA.player_id = playerA.id;
      gameA.opponent = playerB.id;
      gameB.player_id = playerB.id;
      gameB.opponent = playerA.id;

      newPlayerAScore = elo.ifWins(playerAScore, playerBScore);
      newPlayerBScore = elo.ifLoses(playerBScore, playerAScore);
      gameA.score = newPlayerAScore;
      gameB.score = newPlayerBScore;
      gameA.gain = newPlayerAScore - playerAScore;
      gameB.gain = newPlayerBScore - playerBScore;
      games.push(gameA);
      games.push(gameB);
    }

    if(result === 'playerB') {
      gameA.player_id = playerB.id;
      gameA.opponent = playerA.id;
      gameB.player_id = playerA.id;
      gameB.opponent = playerB.id;

      newPlayerAScore = elo.ifLoses(playerAScore, playerBScore);
      newPlayerBScore = elo.ifWins(playerBScore, playerAScore);
      gameA.score = newPlayerBScore;
      gameB.score = newPlayerAScore;
      gameA.gain = newPlayerBScore - playerBScore;
      gameB.gain = newPlayerAScore - playerAScore;
      games.push(gameA);
      games.push(gameB);
    }

    playerAScore = newPlayerAScore;
    playerBScore = newPlayerBScore;
  })

  let ind = 0
  forEach(games, (game, ind) => {
    game.createdAt = +new Date() + ind;
    xhrs.push(api.addGame(game));
    ind += 10;
  });

  dispatch({
    type: 'UPDATE_NEW_SCORE',
    data: {playerA: playerAScore, playerB: playerBScore}
  });

  return Promise.all(xhrs).then(()=> {
    dispatch({
      type: 'SUBMIT_SCORE_SUCCESS'
    });
  });
}

export const reInitialBattle = () => (dispatch) => {
  dispatch({
    type: 'REINITIAL_BATTLE',
  });
}

export const loadAvatars = () => (dispatch) => {
  dispatch({
    type: 'FETCH_AVATARS_REQUEST'
  });

  return api.fetchAvatars().then(
    response => {
      dispatch({
        type: 'FETCH_AVATARS_SUCCESS',
        response: normalize(response, schema.arrayOfAvatars)
      });
    }
  );
}
