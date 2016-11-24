import { combineReducers } from 'redux';

import Elo from 'elo-js';

const createBattle = () => {
  const pairIds = (state = {playerA: null, playerB: null}, action) => {
    switch (action.type) {
      case 'BATTLE_PLAYER_SELECT':
        return Object.assign({}, state, action.data);
      default:
        return state;
    }
  };

  const results = (state = [], action) => {
    switch(action.type) {
      case 'ADD_BATTLE_RESULT':
        return [...state, action.data];
      case 'REMOVE_BATTLE_RESULT':
        return [ ...state.slice(0, action.data), ...state.slice(action.data + 1) ]
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
        let playerBObj = action.data.playerB;
        action.data.results.forEach(function(result){     
          if(result === 'playerA') {
            //playerA won
            newPlayerAScore = elo.ifWins(playerAObj.score, playerBObj.score);
            newPlayerBScore = elo.ifLoses(playerBObj.score, playerAObj.score);
          } else {
            //playerB won
            newPlayerAScore = elo.ifLoses(playerAObj.score, playerBObj.score);
            newPlayerBScore = elo.ifWins(playerBObj.score, playerAObj.score);
          }
          playerAObj.score = newPlayerAScore;
          playerBObj.score = newPlayerBScore;
        });
        return {playerA: newPlayerAScore, playerB: newPlayerBScore};
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