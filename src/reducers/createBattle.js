import { combineReducers } from 'redux';

const createBattle = () => {
  const pairIds = (state = [], action) => {
    if(action.type === 'INITIAL_BATTLE') {
    }
    return state;
  };

  const isReady = (state = false, action) => {
    return state;
  };

  const isSubmitted = (state = false, action) => {
    return state;
  };

  return combineReducers({
    pairIds,
    isReady,
    isSubmitted
  })
};

export default createBattle;

export const getBattelPair = (state) => state.pairIds;