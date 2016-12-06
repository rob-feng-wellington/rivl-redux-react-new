import { combineReducers } from 'redux';
import values from 'lodash/values';

const createAvatar = () => {
  const avatars = (state = [], action) => {
    if(action.type === 'FETCH_AVATARS_SUCCESS' && action.response) {
      return values({
        ...state,
        ...action.response.entities.avatar
      });
    }
    return state;
  }

  const isFetching = (state = false, action) => {
    if(action.type === 'FETCH_AVATARS_REQUEST') {
      return true;
    }

    if(action.type === 'FETCH_AVATARS_SUCCESS') {
      return false;
    }

    return state;
  }

  return combineReducers({
    avatars,
    isFetching
  });

};

export default createAvatar;

export const getAvatars = (state) => state.avatars;

export const getIsFetching = (state) => state.isFetching;