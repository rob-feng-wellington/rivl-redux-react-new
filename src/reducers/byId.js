const byId = (state = {}, action) => {
  const nextState = { ...state };
	switch(action.type) {
    case 'FETCH_PLAYERS_SUCCESS':
      action.response.forEach(player => {
        nextState[player.id] = player;
      });
      return nextState;
    case 'ADD_PLAYER_SUCCESS':
      return {
        ...state,
        [action.response.id]: action.response
      };
    case 'UPDATE_SCORE_SUCCESS':
      nextState[action.response.id].score = action.response.score;
      return nextState;
    default:
      return state;
  }
};

export default byId;

export const getPlayer = (state, id) => state[id];