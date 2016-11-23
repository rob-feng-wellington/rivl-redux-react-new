import { combineReducers } from 'redux';

const createBattle = () => {
  const pairIds = (state = {playerA: null, playerB: null}, action) => {
    switch (action.type) {
      case 'BATTLE_PLAYER_SELECT':
        return Object.assign({}, state, action.data);
      default:
        return state;
    }
  };

  const isSubmitted = (state = false, action) => {
    return state;
  };

  const results = (state = [], action) => {
    switch(action.type) {
      case 'ADD_BATTLE_RESULT':
        return [...state, action.data];
      default:
        return state;
    }
  }

  return combineReducers({
    pairIds,
    isSubmitted,
    results
  })
};

export default createBattle;

export const getBattelPair = (state) => state.pairIds;

export const getIsSubmitted = (state) => state.isSubmitted;

export const getBattleResults = (state) => state.results;