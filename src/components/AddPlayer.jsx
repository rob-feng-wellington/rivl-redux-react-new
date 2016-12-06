import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './../action_creator';
import { getAvatars, getAvatarsIsFetching, getIsAddingPlayer } from '../reducer';
import find from 'lodash/find';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';

import AvatarList from './AvatarList';

const mapStateToProps = (state) => {
  return {
    avatars: getAvatars(state),
    isFetching: getAvatarsIsFetching(state),
    isAdding: getIsAddingPlayer(state)
  };
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ actions }, dispatch);
}

class AddPlayerClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_first_name: '',
      input_last_name: '',
      gender: 'M',
      avatarId: ''
    };
    this.genderChangeHandler = this.genderChangeHandler.bind(this);
    this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
    this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
    this.addPlayerhandler = this.addPlayerhandler.bind(this);
    this.avatarOnSelect = this.avatarOnSelect.bind(this);
  }

  componentDidMount() {
    let { dispatch } = this.props;
    let action = actions.loadAvatars();
    dispatch(action);
  }

  addPlayerhandler(e) {
    let { dispatch } = this.props;
    let player = {};
    player.first_name = this.state.input_first_name;
    player.last_name = this.state.input_last_name;
    player.gender = this.state.gender;
    const avatar = find(this.props.avatars, (avatar) => {
      return avatar.id === this.state.avatarId
    });
    const avatarPath = window.location.origin + '/' + avatar.path;
    
    this.toDataUrl(avatarPath, (base64) => {
      player.avartar_base64 = base64;
      let action = actions.addPlayer(player);
      dispatch(action);
    });
  }

  genderChangeHandler(e, index, value) {
    this.setState({'gender':value});
  }

  firstNameChangeHandler(e, value) {
    this.setState({'input_first_name':value});
  }

  lastNameChangeHandler(e, value) {
    this.setState({'input_last_name':value});
  }

  avatarOnSelect(avatarId) {
    this.setState({'avatarId': avatarId});    
  }

  toDataUrl(src, callback, outputFormat){
    let img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function() {
      let canvas = document.createElement('CANVAS');
      let ctx = canvas.getContext('2d');
      let dataURL;
      canvas.height = this.height;
      canvas.width = this.width;
      ctx.drawImage(this, 0, 0);
      dataURL = canvas.toDataURL(outputFormat);
      callback(dataURL);
    };
    img.src = src;
    if (img.complete || img.complete === undefined) {
      img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      img.src = src;
    }
}

  render() {
    return (
      <div className="wrapper">
        <div className="col-single">
          <form>
            <TextField
              hintText=""
              floatingLabelText="First name"
              floatingLabelFixed={true}
              onChange={this.firstNameChangeHandler}                                             
            />
            <br />
            <TextField
              hintText=""
              floatingLabelText="Last name"
              floatingLabelFixed={true}
              onChange={this.lastNameChangeHandler}                                            
            />
            <br />
            <SelectField
              floatingLabelText="Gender"
              value={this.state.gender}
              onChange={this.genderChangeHandler}
            >
              <MenuItem value='M' primaryText="Male" />
              <MenuItem value='F' primaryText="Female" />
            </SelectField>
            <br />
            <h3>Select an avartar</h3>
            <br />
            <AvatarList 
              avatars={this.props.avatars} 
              isFetching={this.props.isFetching} 
              onSelect={this.avatarOnSelect}
              selected={this.state.avatarId} 
            />
            <div className="clearfix"></div>
            <br />
            <RaisedButton primary={true} label="Submit" disabled={this.props.isAdding} onClick={this.addPlayerhandler} /> 
            {this.props.isAdding ? <CircularProgress /> : null }
          </form>
        </div>
      </div>
    );
  }
};

const AddPlayer = connect(
  mapStateToProps
)(AddPlayerClass);

// Same as connect()(AddPlayer) and connect(null, null)(AddPlayer)

export default AddPlayer;
