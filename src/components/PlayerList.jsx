import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getPlayersByGender } from '../reducer';
import { updateScore } from '../action_creator';

const Player = ({
  onClick,
  first_name,
  last_name,
  gender,
  score
}) => (
  <li> 
    {first_name} {last_name} {gender} {score}
    <button onClick={onClick}>
      1up
    </button>
  </li>
);

const PlayerList = ({
  players,
  onUpClick
}) => (
  <ul>
    {players.map(player => 
      <Player
        key={player.id}
        {...player}
        onClick={() => onUpClick(player.id)}
      />
    )}
  </ul>
);

const mapStateToProps = (state, { params }) => {
  return {
    players: getPlayersByGender(
      state,
      params.filter || 'all'
    )
  };
}

const FilteredPlayerList = withRouter(connect(
  mapStateToProps,
  { onUpClick: updateScore} // same as mapDispatchToProps
)(PlayerList));

export default FilteredPlayerList;