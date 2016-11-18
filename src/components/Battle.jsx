import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as actions from '../action_creator';
import { getBattlePair } from '../reducer';

//material UI
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import cx from 'classnames';
import cloneDeep from 'lodash/cloneDeep';

require('../sass/components/Battle.scss');

const mapStateToProps = (state ) => {
  return {
    pair: getBattlePair(state)
  };
}

class Battle extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { initialBattle } = this.props;
    initialBattle();
  }

  render() {
    return (
      <div>
        <h1>battle</h1>
      </div>
    );
  }
}

Battle = withRouter(connect(
  mapStateToProps,
  actions
)(Battle));

export default Battle;