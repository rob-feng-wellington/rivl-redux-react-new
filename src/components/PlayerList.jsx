import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getPlayersByGender, getIsFetching, getErrorMessage } from '../reducer';
import * as actions from '../action_creator';
import FetchError from './FetchError';

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
  const filter = params.filter || 'all';
  return {
    players: getPlayersByGender(state, filter),
    isFetching: getIsFetching(state, filter),
    errorMessage: getErrorMessage(state, filter),
    filter
  };
}

class FilteredPlayerList extends React.Component {
  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.filter !== this.props.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchPlayers } = this.props;
    fetchPlayers(filter).then(() => console.log('done!'));
  }

  render() {
    const {updateScore, players, isFetching, errorMessage } = this.props;
    if( isFetching && !players.length) {
      return <p>Loading, please wait....</p>;
    }
    if( errorMessage && !players.length) {
      return (
        <FetchError
          message = {errorMessage}
          onRetry = {() => this.fetchData()}
        />
      );
    }
    return (
      <PlayerList 
        players = { players }
        onUpClick={updateScore} 
      />
    );
  }
}

FilteredPlayerList = withRouter(connect(
  mapStateToProps,
  actions
)(FilteredPlayerList));

export default FilteredPlayerList;