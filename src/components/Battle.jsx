import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../action_creator';

//material UI
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class Battle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1 className="center-align">Battle</h1>
      </div>
    )
  }
}

Battle = withRouter(connect(
  null,
  actions
)(Battle));

export default Battle;