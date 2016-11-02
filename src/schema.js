import { Schema, arrayOf } from 'normalizr';

export const player = new Schema('players');
export const arrayOfPlayers = arrayOf(player);