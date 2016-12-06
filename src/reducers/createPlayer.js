import { combineReducers } from 'redux';

const CreatePlayer = () => {
  const isAdding = (state = false, action) => {
    if(action.type === 'ADD_PLAYER_REQUEST') {
      return true;
    }

    if(action.type === 'ADD_PLAYER_SUCCESS') {
      return false;
    }

    return state;
  }

  return combineReducers({
    isAdding
  });
}

export const getIsAdding = (state) => state.isAdding;

export default CreatePlayer;