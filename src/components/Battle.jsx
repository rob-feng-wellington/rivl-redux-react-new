import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../action_creator';
import { getBattlePair, getPlayersByGender, getBattleResults, getBattleNewScores } from '../reducer';

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
    players: getPlayersByGender(state, filter),
    results: getBattleResults(state),
    newScores: getBattleNewScores(state)
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
        onClick={() => onRemoveClick(index)}
      />
    )}
  </ul>
);

const ResultRow = ({
  onClick,
  winner
}) => {
  let playerAWinLoss = 'Loss';
  let playerBWinLoss = 'Loss';
  if(winner === playerALabel) {
    playerAWinLoss = 'Win';
  } else {
    playerBWinLoss = 'Win';
  }

  return (
    <li>
      <div className="row">
        <div className="col main">{playerAWinLoss}</div>
        <div className="col middle"><RaisedButton primary={true} label="remove" onTouchTap={onClick}/></div>
        <div className="col main">{playerBWinLoss}</div>
      </div>
    </li>
  );
}

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

  getPlayerById(id) {
    return id ? find(this.props.players, ['id', id]) : null;
  }

  showNameInitial(whichPlayer) {
    const id = this.props.pair[whichPlayer];
    const player = this.getPlayerById(id);
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

  submitResults() {
    const { calculateScore, submitScore } = this.props;
    const results = this.props.results;
    const playerAObject = this.getPlayerById(this.props.pair[playerALabel]);
    const playerBObject = this.getPlayerById(this.props.pair[playerBLabel]);

    calculateScore(playerAObject, playerBObject, results);
    //once calculate is done => submit
    submitScore(playerAObject, playerBObject);
  }

  render() {
    const avatarSize = 200;
    const selectMaxHeight = 200;
    const selectHint = 'Please choose one';
    const playerList = [];
    const { removeResult } = this.props;

    this.props.players.forEach(function(player){
      const avatarLetter = player.first_name.charAt(0).toUpperCase();
      playerList.push(
        <MenuItem 
          value={player.id}
          rightAvatar={<Avatar size={20}>{avatarLetter}</Avatar>}
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
            onRemoveClick={removeResult} 
          />
          <div className="col-single">
            <RaisedButton 
              onTouchTap={() => this.submitResults()} 
              label="Submit" 
              primary={true}
              className='submitButton'
            />
          </div>
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