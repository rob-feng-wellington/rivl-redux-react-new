import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './../action_creator';
import { getAvatars, getAvatarsIsFetching, getIsAddingPlayer, getChooseAvatar } from '../reducer';
import find from 'lodash/find';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import CircularProgress from 'material-ui/CircularProgress';
import FontIcon from 'material-ui/FontIcon';
import ActionFileUpload from 'material-ui/svg-icons/file/file-upload';

import Cropper from 'react-crop';
import '../../node_modules/react-crop/cropper.css';

// You'll need to use async functions
import "babel-core/register";
//import "babel-polyfill";

import AvatarList from './AvatarList';

const mapStateToProps = (state) => {
  return {
    avatars: getAvatars(state),
    isFetching: getAvatarsIsFetching(state),
    isAdding: getIsAddingPlayer(state),
    chooseAvatar: getChooseAvatar(state)
  };
}

class AddPlayerClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_first_name: '',
      input_last_name: '',
      gender: 'M',
      avatarId: '',
      errors: {
        input_first_name: '',
        input_last_name: ''
      },
      image: null,
      previewUrl: null
    };
    this.genderChangeHandler = this.genderChangeHandler.bind(this);
    this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
    this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
    this.addPlayerhandler = this.addPlayerhandler.bind(this);
    this.avatarOnSelect = this.avatarOnSelect.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.imageLoaded = this.imageLoaded.bind(this);
    this.crop = this.crop.bind(this);
    this.clear = this.clear.bind(this);
  }
  
  componentDidMount() {
    let { dispatch } = this.props;
    let action = actions.loadAvatars();
    dispatch(action);
  }

  addPlayerhandler(e) {
    let { dispatch } = this.props;
    let player = {};
    let errors = {};
    if(this.state.input_first_name === '' || this.state.input_last_name === '') {
      if(this.state.input_first_name === '') {
        errors.input_first_name = 'First name is required';
      }
      if(this.state.input_last_name === '') {
        errors.input_last_name = 'Last name is required';
      }

      this.setState({'errors': errors});
      return;
    } 
    player.first_name = this.state.input_first_name;
    player.last_name = this.state.input_last_name;
    player.gender = this.state.gender;

    if(this.state.previewUrl !== null || this.state.avatarId !== '') {
      this.toDataUrl(this.state.previewUrl, (base64) => {
        player.avartar_base64 = base64;
        let action = actions.addPlayer(player);
        dispatch(action);
      });
    } else if (this.state.avatarId !== '') {
      const avatar = find(this.props.avatars, (avatar) => {
        return avatar.id === this.state.avatarId
      });
      const avatarPath = window.location.origin + '/' + avatar.path;
      
      this.toDataUrl(avatarPath, (base64) => {
        player.avartar_base64 = base64;
        let action = actions.addPlayer(player);
        dispatch(action);
      });
    } else {
      player.avartar_base64 = '';
      let action = actions.addPlayer(player);
      dispatch(action);
    }
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

  updateAvatarSetting(setting) {
    let { dispatch } = this.props;
    let action = actions.changeChooseAvatar(setting);
    dispatch(action);
  }

  fileUpload(ev) {
    this.setState({
      image: ev.target.files[0]
    })
  }

  imageLoaded(img) {
    if (img.naturalWidth && img.naturalWidth < 262 &&
        img.naturalHeight && img.naturalHeight < 147) {
        this.crop()
    }
  }

  clear() {
    //this.refs.file.value = null
    this.setState({
        previewUrl: null,
        image: null
    })
  }

  async crop() {
    let image = await this.refs.crop.cropImage()
    this.setState({
        previewUrl: window.URL.createObjectURL(image)
    })
  }

  render() {
    const styles = {
      toggleStyle : {
        margin: 0,
      },
      exampleImageInput: {
        cursor: 'pointer',
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        width: '100%',
        opacity: 0,
      },
    }

    let chooseImageButton =(
      <RaisedButton
        label="Choose an Image"
        labelPosition="after"
        style={styles.button}
        containerElement="label"
        primary={true}
        icon={<ActionFileUpload />}
      >
        <input ref="file" type="file" style={styles.exampleImageInput} onChange={this.fileUpload}/>
      </RaisedButton>
    );

    let cropArea = (
      <div>
        <div className="clearfix"></div>
        <br />
        <Cropper
            ref='crop'
            image={this.state.image}
            width={200}
            height={200}
            onImageLoaded={this.imageLoaded}
        />
        <div className="clearfix"></div>
        <RaisedButton label="OK" primary={true} onTouchTap={this.crop} />
      </div>
    );

    let previewArea = (
      <div>
        <div className="clearfix"></div>
        <br />
        <img src={this.state.previewUrl} />
        <div className="clearfix"></div>
        <RaisedButton label="Nah... try again" secondary={true} onTouchTap={this.clear} />
      </div>
    );

    let avatarList = (
      <div>
        <div className="clearfix"></div>
        <br />
        <AvatarList 
          avatars={this.props.avatars} 
          isFetching={this.props.isFetching} 
          onSelect={this.avatarOnSelect}
          selected={this.state.avatarId} 
        />
      </div>
    );

    return (
      <div className="wrapper">
        <div className="col-single">
          <form>
            <TextField
              hintText=""
              floatingLabelText="First name"
              floatingLabelFixed={true}
              errorText={this.state.errors.input_first_name || ''}
              onChange={this.firstNameChangeHandler}                                             
            />
            <br />
            <TextField
              hintText=""
              floatingLabelText="Last name"
              floatingLabelFixed={true}
              errorText={this.state.errors.input_last_name || ''}
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
            <h4>Upload/Choose an Avatar</h4>
            <RaisedButton primary={!this.props.chooseAvatar} label="Upload" onTouchTap={() => this.updateAvatarSetting(false)} style={styles.toggleStyle} />
            <RaisedButton primary={this.props.chooseAvatar} label="Choose" onTouchTap={() => this.updateAvatarSetting(true)} style={styles.toggleStyle} />
            <div className="clearfix"></div>
            <br />
            {
              this.props.chooseAvatar ?
              avatarList : !this.state.previewUrl && chooseImageButton
            }
            {
              this.state.image && !this.state.previewUrl && !this.props.chooseAvatar && cropArea
            }
            {
              this.state.image && this.state.previewUrl && !this.props.chooseAvatar && previewArea
            }
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
  mapStateToProps,
)(AddPlayerClass);

// Same as connect()(AddPlayer) and connect(null, null)(AddPlayer)

export default AddPlayer;
