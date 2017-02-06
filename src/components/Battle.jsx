import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../action_creator';
import { getBattlePair, getPlayersByGender, getBattleResults, getBattleNewScores } from '../reducer';

//components
import PlayerArea from './PlayerArea.jsx';
import PlayerSelectArea from './PlayerSelectArea.jsx';
import BattleResultArea from './BattleResultArea.jsx';
import BattleArea from './BattleArea.jsx';
import BattleSummary from './BattleSummary.jsx';

//helpers
import find from 'lodash/find';
import clone from 'lodash/clone';

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

class Battle extends React.Component {
  constructor(props) {
    super(props);
    this.addResult = this.addResult.bind(this);
    this.submitResults = this.submitResults.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount() {
    const { initialBattle, fetchPlayers } = this.props;
    fetchPlayers('all');
    initialBattle();
  }

  getPlayerById(id) {
    return id ? find(this.props.players, ['id', id]) : null;
  }

  isReady() {
    return !!(this.props.pair[playerALabel] && this.props.pair[playerBLabel]);
  }

  hasResults() {
    return this.props.results.length > 0;
  }

  hasSubmitted() {
    return this.props.newScores.playerA !== null;
  }

  getSummary() {
    if(this.hasSubmitted()) {
      const playerAScoreAfter = this.props.newScores.playerA;
      const playerBScoreAfter = this.props.newScores.playerB;

      const playerAObj = this.getPlayerById(this.props.pair[playerALabel]);
      const playerBObj = this.getPlayerById(this.props.pair[playerBLabel]);
      const playerAScoreBefore = playerAObj.score;
      const playerBScoreBefore = playerBObj.score;

      return {
        playerA: playerAScoreAfter - playerAScoreBefore,
        playerB: playerBScoreAfter - playerBScoreBefore
      }
    }

    return {
      playerA: null,
      playerB: null
    }
  }

  goBack() {
    const { reInitialBattle, fetchPlayers } = this.props;
    fetchPlayers('all');
    reInitialBattle();
  }

  addResult(whichPlayerWin) {
    const { addResults } = this.props;
    addResults(whichPlayerWin);
  }

  submitResults() {
    const { submitScore } = this.props;
    const results = this.props.results;
    const playerAObject = this.getPlayerById(this.props.pair[playerALabel]);
    const playerBObject = this.getPlayerById(this.props.pair[playerBLabel]);
    
    submitScore(playerAObject, playerBObject, results);
  }

  render() {
    const isReady = this.isReady();
    const hasResults = this.hasResults();
    const hasSubmitted = this.hasSubmitted();
    const summary = this.getSummary();

    return (
      <div className="wrapper">
        <PlayerArea pair={this.props.pair} players={this.props.players} />
        <div className="clearfix"></div>
        <PlayerSelectArea pair={this.props.pair} players={this.props.players} />
        <div className="clearfix"></div>
        { hasSubmitted ? 
          <BattleSummary summary={summary} onGoBack={this.goBack} /> 
          :   
          [
            <BattleArea isReady={isReady} onAddResult={this.addResult} key={1} />,
            <div className="clearfix" key={2}></div>,
            <BattleResultArea results={this.props.results} onSubmit={this.submitResults} hasResults={hasResults} key={3} />,
          ] 
        }
      </div>
    );
  }
}

Battle = withRouter(connect(
  mapStateToProps,
  actions
)(Battle));

export default Battle;