import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../action_creator';
import { getProfileIsFetching, getProfile } from '../reducer';

import Avatar from 'material-ui/Avatar';
import CircularProgress from 'material-ui/CircularProgress';

import isEmpty from 'lodash/isEmpty';

const mapStateToProps = (state, {params}) => {
  return {
    playerId: params.id,
    profile: getProfile(state),
    isFetching: getProfileIsFetching(state)
  }
}

class Profile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchPlayer } = this.props;
    fetchPlayer(this.props.playerId);
  }

  render() {
    if (this.props.isFetching) {
      return (
        <div className = "wrapper">
          <div className="col-single align-center">
            <CircularProgress size={300} thickness={20} />
          </div>
        </div>
      )
    }

    const avatarSize = 300;
    let avatar = null;
    let score = 1500;
    let gamesPlayed = 0;
    let formCount = 0;
    let formHtml = null;
    const player = this.props.profile;

    if(!isEmpty(player)) {
      if(player.avartar_base64 && player.avartar_base64 !== '') {
        avatar = <Avatar 
                  size={avatarSize} 
                  className="avatarStyle" 
                  src={player.avartar_base64} 
                />;
      } else {
        avatar = <Avatar
                  size={avatarSize} 
                  className="avatarStyle"
                  >{player.first_name.charAt(0).toUpperCase()}
                </Avatar>;
      }
      score =  player.games[0].score;
      gamesPlayed = player.games.length;
      formCount = gamesPlayed > 5 ? 5: gamesPlayed;
      formHtml = player.games.slice(0, formCount).map((game,key) => {
        if(key < formCount -1 ) {
          return game.gain > 0 ? 
            <span key={key}><span className='game-won'>W</span><span>-</span></span> : 
            <span key={key}><span className='game-lost'>L</span><span>-</span></span>;
        } else {
          return game.gain > 0 ? 
            <span key={key}><span className='game-won'>W</span></span> : 
            <span key={key}><span className='game-lost'>L</span></span>;
        }
      });
    }
    
    return (
      <div className = "wrapper">
        <div className="col-single align-center">
          {avatar}
          <div className="clearfix"></div>
          <h2>{player.first_name + ' ' + player.last_name}</h2>
        </div>
        <div className="number-area row">
          <div className="col three">
            <h1 className="no-gap">{score}</h1>
            <p className="no-gap text-light">is your score</p>
          </div>
          <div className="col three">
            <h1 className="no-gap">{gamesPlayed}</h1>
            <p className="no-gap text-light">games played</p>
          </div>
          <div className="col three">
            <h1 className="no-gap">{formHtml}</h1>
            <p className="no-gap text-light">{'last ' + formCount  + ' games'}</p>
          </div>
        </div>
      </div>
    );
  }
}

Profile = withRouter(connect(
  mapStateToProps,
  actions
)(Profile));

export default Profile;