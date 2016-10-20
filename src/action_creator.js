import { v4 } from 'node-uuid';
import * as api from './api';

export const requestPlayers = (filter) => ({
  type: 'REQUEST_PLAYERS',
  filter
});

const receivePlayers = (filter, response) => ({
  type: 'RECEIVE_PLAYERS',
  filter,
  response
});

export const fetchPlayers = (filter) => 
  api.fetchPlayers(filter).then(response => 
    receivePlayers(filter,response)
  );

export const addPlayer = (player)  => ({
  type: 'ADD_PLAYER',
  entry: {
    first_name: player.first_name,
    last_name: player.last_name,
    id: v4(),
    gender: 'M'
  }       
});

export const updateScore = (id) => ({
  type: 'UPDATE_SCORE',
  entry: {
    id: id,
    margin: 1
  }
});
