const byId = (state = {}, action) => {
  if(action.response) {
    return {
      ...state,
      ...action.response.entities.players
    };
  }
  return state;
};

export default byId;

export const getPlayer = (state, id) => state[id];