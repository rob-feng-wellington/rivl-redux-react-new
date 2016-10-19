const createList = (filter) => {
  return (state = [], action) => {
    if (action.filter !== filter) {
      return state;
    }
    switch(action.type) {
      case 'RECEIVE_PLAYERS':
        return action.response.map(player => player.id);
      default:
        return state;
    }
  };
};

export default createList;

export const getIds = (state) => state;