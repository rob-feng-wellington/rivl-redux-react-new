import React from 'react';
import { connect } from 'react-redux';
import { addPlayer } from './../action_creator';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


class AddPlayerClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input_first_name: '',
      input_last_name: '',
      gender: 'M'
    };
    this.genderChangeHandler = this.genderChangeHandler.bind(this);
    this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this);
    this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this);
    this.addPlayerhandler = this.addPlayerhandler.bind(this);
  }

  addPlayerhandler(e) {
    let player = {};
    player.first_name = this.state.input_first_name;
    player.last_name = this.state.input_last_name;
    player.gender = this.state.gender;
    this.props.dispatch(addPlayer(player));
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

  render() {
    return (
      <div>
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
            <RaisedButton primary={true} label="Submit" onClick={this.addPlayerhandler} />  
        </form>
      </div>
    );
  }
};

const AddPlayer = connect(
  null, //no props
  null,
)(AddPlayerClass);

// Same as connect()(AddPlayer) and connect(null, null)(AddPlayer)

export default AddPlayer;
