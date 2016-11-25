import React from 'react';
import Avatar from 'material-ui/Avatar';
import find from 'lodash/find';

class PlayerSection extends React.Component {
  constructor(props) {
    super(props);
  }

  showNameInitial(label) {
    const id = this.props.pair[label];
    const player = id ? find(this.props.players, ['id', id]) : null;
    return player ? player.first_name.charAt(0).toUpperCase() : '?' ;
  }

  render() {
    const avatarSize = 200;
    return (
       <Avatar
      size={avatarSize} 
      className="avatarStyle"
      >{this.showNameInitial(this.props.label)}</Avatar>
    )
  }
}

class PlayerArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="players-area row">
        <div className="player col main">
          <PlayerSection label='playerA' pair={this.props.pair} players={this.props.players} />
        </div>
        <div className="col middle"></div>
        <div className="player col main">
          <PlayerSection label='playerB' pair={this.props.pair} players={this.props.players} />
        </div>
      </div> 
    );
  }
}

export default PlayerArea;
