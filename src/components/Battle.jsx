import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../action_creator';
import { getBattlePair, getIsSubmitted, getPlayersByGender, getBattleResults } from '../reducer';

//material UI
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import cx from 'classnames';
import cloneDeep from 'lodash/cloneDeep';
import find from 'lodash/find';

require('../sass/components/Battle.scss');

const playerALabel = 'playerA';
const playerBLabel = 'playerB';

const mapStateToProps = (state ) => {
  const filter = 'all';
  return {
    pair: getBattlePair(state),
    isSubmitted: getIsSubmitted(state),
    players: getPlayersByGender(state, filter),
    results: getBattleResults(state)
  };
}

const ResultList = ({
  results,
  onRemoveClick
}) => (
  <ul>
    {results.map((result,index) => 
      <ResultRow
        key={index}
        winner={result}
        onClick={onRemoveClick}
      />
    )}
  </ul>
);

const ResultRow = ({
  onClick,
  winner
}) => (
  <li>
    <div className="row">
      <div className="col main">Win</div>
      <div className="col middle"><RaisedButton primary={true} label="remove" onTouchTap={onClick}/></div>
      <div className="col main">Lose</div>
    </div>
  </li>
)

class Battle extends React.Component {
  constructor(props) {
    super(props);

    this.handlePlayerSelect = this.handlePlayerSelect.bind(this);
  }

  componentDidMount() {
    const { initialBattle, fetchPlayers } = this.props;
    fetchPlayers('all');
    initialBattle();
  }

  showNameInitial(whichPlayer) {
    const id = this.props.pair[whichPlayer];
    const player = id ? find(this.props.players, ['id', id]) : null;
    return player ? player.first_name.charAt(0).toUpperCase() : '?' ;
  }

  handlePlayerSelect(whichPlayer, event, index, value) {
    const { playerSelect } = this.props;
    playerSelect(whichPlayer, value);
  }

  isReady() {
    return this.props.pair[playerALabel] && this.props.pair[playerBLabel];
  }

  addResult(whichPlayerWin) {
    const { addResults } = this.props;
    addResults(whichPlayerWin);
  }

  removeResult(index) {
    const { removeResult } = this.props;
    removeResult(index);
  }

  render() {
    const avatarSize = 200;
    const selectMaxHeight = 200;
    const selectHint = 'Please choose one';
    const playerList = [];

    this.props.players.forEach(function(player){
      playerList.push(
        <MenuItem 
          value={player.id} 
          key={player.id} 
          primaryText={player.first_name + " " + player.last_name }

        />
      );
    });

    return (
      <div className="wrapper">
        <div className="players-area row">
          <div data-name="playerA" className="player col main">
            <Avatar
              size={avatarSize}
              className="avatarStyle"
            >{this.showNameInitial(playerALabel)}</Avatar>
          </div>
          <div className="col middle"></div>
          <div data-name="playerB" className="player col main">
            <Avatar
              size={avatarSize}
              className="avatarStyle"
            >{this.showNameInitial(playerBLabel)}</Avatar>
          </div>
        </div>
        <div className="players-select row">
          <div className="col main">
            <SelectField
              value={this.props.pair.playerA}
              onChange={(event, index, value) => this.handlePlayerSelect(playerALabel, event, index, value)}
              maxHeight={selectMaxHeight}
              hintText={selectHint}
            >
              {playerList}
            </SelectField>
          </div>
          <div className="col middle"></div>
          <div className="col main">
            <SelectField
              value={this.props.pair.playerB}
              onChange={(event, index, value) => this.handlePlayerSelect(playerBLabel, event, index, value)}
              maxHeight={selectMaxHeight}
              hintText={selectHint}
            >
              {playerList}
            </SelectField>
          </div>
        </div>
        <div className="battle-result-area row">
          <ResultList 
            results = { this.props.results }
            onRemoveClick={this.removeResult} 
          />
        </div>
        <div className="battle-area row">
          <div className="col main">
            <RaisedButton 
              onTouchTap={() => this.addResult(playerALabel)} 
              label="Win" 
              primary={true} 
              disabled={!this.isReady()} />
          </div>
          <div className="col middle"></div>
          <div className="col main">
            <RaisedButton 
              onTouchTap={() => this.addResult(playerBLabel)} 
              label="Win" 
              primary={true} 
              disabled={!this.isReady()} />
          </div>
        </div>
      </div>
    );
  }
}

Battle = withRouter(connect(
  mapStateToProps,
  actions
)(Battle));

export default Battle;