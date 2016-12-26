import forEach from 'lodash/forEach';

const byId = (state = {}, action) => {
  if(action.response) {
    //transfer games to score attribute
    let results = {};
    forEach(action.response.entities.players, (val, key) => {
      val.score = val.games && val.games.length > 0 ? val.games[0].score : 1500;
      results[key] = val;
    });
    return {
      ...state,
      ...results
    };
  }
  return state;
};

export default byId;

export const getPlayer = (state, id) => state[id];