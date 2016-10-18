import { v4 } from 'node-uuid';

export function addPlayer (player) {
  return {
    type: 'ADD_PLAYER',
    entry: {
      first_name: player.first_name,
      last_name: player.last_name,
      id: v4(),
      gender: 'M'
    }       
  }
};

export function updateScore(id) {
  return {
    type: 'UPDATE_SCORE',
    entry: {
      id: id,
      margin: 1
    }
  }
};