import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../action_creator';
import RaisedButton from 'material-ui/RaisedButton';

const playerALabel = 'playerA';
const playerBLabel = 'playerB';

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

class BattleResultArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { removeResult } = this.props;
    const submitButton = (
      <div className="col-single">
        <RaisedButton 
          onTouchTap={this.props.onSubmit} 
          label="Submit" 
          primary={true}
          className='submitButton'
        />
      </div>
    );
    return (
      <div className="battle-result-area row">
        <ResultList 
          results = { this.props.results }
          onRemoveClick={removeResult} 
        />
        {this.props.hasResults ? submitButton : null}
      </div>
    );
  }
}

BattleResultArea = withRouter(connect(
  null,
  actions
)(BattleResultArea));

export default BattleResultArea;