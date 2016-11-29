import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class BattleArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const playerALabel = 'playerA';
    const playerBLabel = 'playerB';
    return (
      <div className="battle-area row">
        <div className="col main">
          <RaisedButton 
            onTouchTap={() => this.props.onAddResult(playerALabel)} 
            label="Win" 
            primary={true} 
            disabled={!this.props.isReady} />
        </div>
        <div className="col middle"></div>
        <div className="col main">
          <RaisedButton 
            onTouchTap={() => this.props.onAddResult(playerBLabel)} 
            label="Win" 
            primary={true}
            disabled={!this.props.isReady} />
        </div>
      </div>
    );
  }
}

export default BattleArea;
