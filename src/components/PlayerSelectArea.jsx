import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../action_creator';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';

class PlayerSelectArea extends React.Component {
  constructor(props) {
    super(props);
  }

  handlePlayerSelect(whichPlayer, event, index, value) {
    const { playerSelect } = this.props;
    playerSelect(whichPlayer, value);
  }

  render() {
    const selectMaxHeight = 200;
    const selectHint = 'Please choose one';
    const playerList = [];
    const playerALabel = 'playerA';
    const playerBLabel = 'playerB';

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
    );
  }
}

PlayerSelectArea = withRouter(connect(
  null,
  actions
)(PlayerSelectArea));

export default PlayerSelectArea;