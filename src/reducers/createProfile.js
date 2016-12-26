import { combineReducers } from 'redux';

const createProfile = () => {
  const profile = (state = {}, action) => {
    if(action.type === 'FETCH_PLAYER_SUCCESS' && action.data ) {
      return action.data;
    }

    return state;
  }

  const isFetching = (state = false, action) => {
    if(action.type === 'FETCH_PLAYER_REQUEST') {
      return true;
    }

    if(action.type === 'FETCH_PLAYER_SUCCESS') {
      return false;
    }

    return state;
  }

  return combineReducers({
    profile,
    isFetching
  }) 
}

export default createProfile;

export const getIsFetching = (state) =>  state.isFetching;

export const getProfile = (state) => state.profile;