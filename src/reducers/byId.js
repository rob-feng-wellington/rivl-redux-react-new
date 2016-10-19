const byId = (state = {}, action) => {
	switch(action.type) {
    case 'RECEIVE_PLAYERS':
      const nextState = { ...state };
      action.response.forEach(player => {
        nextState[player.id] = player;
      });
      return nextState;
    default:
      return state;
  }
};

export default byId;

export const getPlayer = (state, id) => state[id];