import { combineReducers } from 'redux';

const player = (state, action) => {
  switch (action.type) {
    case 'ADD_PLAYER':
      return {
        id: action.entry.id,
        first_name: action.entry.first_name,
        last_name: action.entry.last_name,
        score: 1500,
        gender: action.entry.gender || 'M'
      };
    case 'UPDATE_SCORE':
      if(state.id !== action.entry.id) {
        return state;
      }
      return {
        ...state,
        score: state.score + action.entry.margin
      };
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
	switch(action.type) {
		case 'ADD_PLAYER':
    case 'UPDATE_SCORE':
      return {
        ...state,
        [action.entry.id]: player(state[action.entry.id], action)
      }
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch(action.type) {
    case 'ADD_PLAYER':
      return [...state, action.entry.id];
    default:
      return state;
  }
};

const players = combineReducers({
  byId,
  allIds
})

const battleApp = combineReducers({
  players   
});

export default battleApp;

const getAllPlayers = (state) => 
  state.players.allIds.map(id => state.players.byId[id]);


//************ Get players based on gender start *************/
export const getPlayersByGender = (state, filter) => {
  const allPlayers = getAllPlayers(state);
  switch(filter) {
    case 'all':
      return allPlayers;
    case 'male':
      return allPlayers.filter( p => p.gender === 'M');
    case 'female':
      return allPlayers.filter( p => p.gender === 'F');
    default:
      return allPlayers;
  }
};
//************ Get players based on gender end *************/