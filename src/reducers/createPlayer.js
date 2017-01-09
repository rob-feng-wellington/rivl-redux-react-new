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

  const chooseAvater = (state = true, action) => {
    if(action.type === 'CHANGE_CHOOSE_AVATAR') {
      return action.data;
    }

    return state;
  }

  return combineReducers({
    isAdding,
    chooseAvater
  });
}

export const getIsAdding = (state) => state.isAdding;
export const getChooseAvatar = (state) => state.chooseAvater;

export default CreatePlayer;