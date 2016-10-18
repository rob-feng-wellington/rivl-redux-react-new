import React from 'react';
import { connect } from 'react-redux';
import { addPlayer } from './../action_creator';

let AddPlayer = ({ dispatch }) => {
  let input_first_name, input_last_name, player = {};
  return (
    <div>
      <input ref = { node => {
        input_first_name = node;
      }} />
      <input ref = { node => {
        input_last_name = node;
      }} />
      <button onClick={() => {
        player.first_name = input_first_name.value;
        player.last_name = input_last_name.value;
        dispatch(addPlayer(player));
        input_first_name.value = '';
        input_last_name.value = '';
      }}>
        Add player
      </button>
    </div>
  );
};

AddPlayer = connect(
  null, //no props
  dispatch => {
    return { dispatch }
  }
)(AddPlayer);

// Same as connect()(AddPlayer) and connect(null, null)(AddPlayer)

export default AddPlayer;
