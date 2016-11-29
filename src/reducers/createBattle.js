import { combineReducers } from 'redux';

import Elo from 'elo-js';

const createBattle = () => {
  const pairIds = (state = {playerA: null, playerB: null}, action) => {
    switch (action.type) {
      case 'BATTLE_PLAYER_SELECT':
        return Object.assign({}, state, action.data);
      case 'REINITIAL_BATTLE':
        return {playerA: null, playerB: null};
      default:
        return state;
    }
  };

  const results = (state = [], action) => {
    switch(action.type) {
      case 'ADD_BATTLE_RESULT':
        return [...state, action.data];
      case 'REMOVE_BATTLE_RESULT':
        return [ ...state.slice(0, action.data), ...state.slice(action.data + 1) ];
      case 'REINITIAL_BATTLE':
        return [];
      default:
        return state;
    }
  }

  const newScores = (state = {playerA: null, playerB: null}, action) => {
    switch(action.type) {
      case 'CALCULATE_BATTLE_SCORE':
        let elo = new Elo();
        let newPlayerAScore, newPlayerBScore;
        let playerAObj = action.data.playerA;
        let playerAScore = playerAObj.score;
        let playerBObj = action.data.playerB;
        let playerBScore = playerBObj.score;
        action.data.results.forEach(function(result){     
          if(result === 'playerA') {
            //playerA won
            newPlayerAScore = elo.ifWins(playerAScore, playerBScore);
            newPlayerBScore = elo.ifLoses(playerBScore, playerAScore);
          } else {
            //playerB won
            newPlayerAScore = elo.ifLoses(playerAScore, playerBScore);
            newPlayerBScore = elo.ifWins(playerBScore, playerAScore);
          }
          playerAScore = newPlayerAScore;
          playerBScore = newPlayerBScore;
        });
        return {playerA: newPlayerAScore, playerB: newPlayerBScore};
      case 'REINITIAL_BATTLE':
        return {playerA: null, playerB: null}
      default:
        return state;
    }
  }

  return combineReducers({
    pairIds,
    results,
    newScores
  })
};

export default createBattle;

export const getBattlePair = (state) => state.pairIds;

export const getBattleResults = (state) => state.results;

export const getBattleNewScores = (state) => state.newScores;