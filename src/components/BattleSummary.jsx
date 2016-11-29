import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';

class BattleSummary extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="battle-summary row">
        <div className="col main">
          {this.props.summary.playerA}
        </div>
        <div className="col middle"></div>
        <div className="col main">
          {this.props.summary.playerB}
        </div>
        <br />
        <div className="col-single">
          <RaisedButton 
            onTouchTap={this.props.onGoBack} 
            label="Go back" 
            primary={true}
            className='single-column btn'
          />
        </div>
      </div>
      
    );
  }
}


export default BattleSummary;