import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getPlayersByGender, getIsFetching, getErrorMessage } from '../reducer';
import * as actions from '../action_creator';

import FetchError from './FetchError';
import GenderFilter from './GenderFilter';

import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import TextField from 'material-ui/TextField';

import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import clone from 'lodash/clone';

const mapStateToProps = (state, { params }) => {
  const filter = params.filter || 'all';
  return {
    players: getPlayersByGender(state, filter),
    isFetching: getIsFetching(state, filter),
    errorMessage: getErrorMessage(state, filter),
    filter
  };
}

class FilteredPlayerList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: true,
      showRowHover: false,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: false,
      showCheckboxes: false,
      height: '400px',
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.filter !== this.props.filter) {
      this.fetchData();
    }
  }

  fetchData() {
    const { filter, fetchPlayers } = this.props;
    fetchPlayers(filter).then(() => {
      console.log('done');
    });
  }

  render() {
    const {updateScore, players, isFetching, errorMessage } = this.props;
    if( isFetching && !players.length) {
      return <p>Loading, please wait....</p>;
    }
    if( errorMessage && !players.length) {
      return (
        <FetchError
          message = {errorMessage}
          onRetry = {() => this.fetchData()}
        />
      );
    }
    return (
      <div className="wrapper">
        <GenderFilter />
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          fixedFooter={this.state.fixedFooter}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="3" tooltip="Score board" style={{textAlign: 'center'}}>
                Score board
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Gender">Gender</TableHeaderColumn>
              <TableHeaderColumn tooltip="The Score">Score</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {this.props.players.map( (player, index) => (
              <TableRow key={index}>
                <TableRowColumn>{player.first_name + ' ' + player.last_name}</TableRowColumn>
                <TableRowColumn>{player.gender}</TableRowColumn>
                <TableRowColumn>{player.score}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn>Name</TableRowColumn>
              <TableRowColumn>Gender</TableRowColumn>
              <TableRowColumn>Score</TableRowColumn>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    );
  }
}

FilteredPlayerList = withRouter(connect(
  mapStateToProps,
  actions
)(FilteredPlayerList));

export default FilteredPlayerList;