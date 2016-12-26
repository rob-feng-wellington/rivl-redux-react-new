import React from 'react';
import { connect } from 'react-redux';
import { withRouter, hashHistory, Link } from 'react-router';
import { getPlayersByGender, getIsFetching, getErrorMessage } from '../reducer';
import * as actions from '../action_creator';

import FetchError from './FetchError';


import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import forOwn from 'lodash/forOwn';

const mapStateToProps = (state, { params }) => {
  const filter = params && params.gender ? params.gender : 'all' ;
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
      table: {
        fixedHeader: true,
        fixedFooter: true,
        stripedRows: false,
        showRowHover: false,
        selectable: false,
        multiSelectable: false,
        enableSelectAll: false,
        deselectOnClickaway: false,
        showCheckboxes: false,
        height: '600px',
      },
      filter: {
        gender: this.props.filter,
      },
      subFilter: {
        name: '',
        id: ''
      }
    };

    this.handleGenderChange = this.handleGenderChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.filter !== this.props.filter) {
      this.fetchData();
    }
    if(this.state.subFilter.name !== '') {
      const row = document.querySelectorAll('tr.active')[0];
      row.scrollIntoView();
    }
  }

  fetchData() {
    const { filter, fetchPlayers } = this.props;
    fetchPlayers(filter).then(() => {
      console.log('done');
    });
  }

  getSortedPlayers() {
    return reverse(sortBy(this.props.players, 'score'));
  }

  getAllNames() {
    const allNames = this.getSortedPlayers().map( (player) => (
      {text: player.first_name + ' ' + player.last_name, value: player.id }
    ));
    return allNames;
  }

  updateFilterUrl() {
    hashHistory.push('/' + this.state.filter.gender);
  }

  handleGenderChange(evt) {
    let newFilter = this.state.filter;
    newFilter.gender = evt.target.innerText.toLowerCase();
    this.setState({filter: newFilter});
    this.updateFilterUrl();
  }

  handleNameChange(val) {
    let newSubFilter = this.state.subFilter;
    newSubFilter.name = val.text;
    newSubFilter.id = val.value;
    this.setState({subFilter: newSubFilter});
  }

  render() {
    const {updateScore, players, isFetching, errorMessage } = this.props;

    const sortedPlayers = this.getSortedPlayers();

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
        <Table
          height={this.state.table.height}
          fixedHeader={this.state.table.fixedHeader}
          fixedFooter={this.state.table.fixedFooter}
          selectable={this.state.table.selectable}
          multiSelectable={this.state.table.multiSelectable}
          ref="playerTable"
        >
          <TableHeader
            displaySelectAll={this.state.table.showCheckboxes}
            adjustForCheckbox={this.state.table.showCheckboxes}
            enableSelectAll={this.state.table.enableSelectAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="4" tooltip="Score board" style={{textAlign: 'center'}}>
                Score board
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>Rank</TableHeaderColumn>
              <TableHeaderColumn>
                <AutoComplete
                  fullWidth={true}
                  floatingLabelText="Name"
                  filter={AutoComplete.caseInsensitiveFilter}
                  onNewRequest={this.handleNameChange}
                  dataSource={this.getAllNames()}
                  searchText={this.state.subFilter.name}
                  className="normal-font"
                />
              </TableHeaderColumn>
              <TableHeaderColumn>
                <SelectField
                  floatingLabelText="Gender"
                  value={this.state.filter.gender}
                  onChange={this.handleGenderChange}
                  className="normal-font"
                  fullWidth={true}
                >
                  <MenuItem value='all' primaryText="All" />
                  <MenuItem value='male' primaryText="Male" />
                  <MenuItem value='female' primaryText="Female" />
                </SelectField>
              </TableHeaderColumn>
              <TableHeaderColumn tooltip="The Score">Score</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.table.showCheckboxes}
            deselectOnClickaway={this.state.table.deselectOnClickaway}
            showRowHover={this.state.table.showRowHover}
            stripedRows={this.state.table.stripedRows}
          >
            {sortedPlayers.map( (player, index) => {
              const className = player.id === this.state.subFilter.id ? 'active' : 'inactive';
              return (
                <TableRow className={className} key={index}>
                  <TableRowColumn>{index + 1}</TableRowColumn>
                  <TableRowColumn>
                     <Link
                      to={ {pathname: '/player/' + player.id  }}
                    >
                      {player.first_name + ' ' + player.last_name}
                    </Link>
                  </TableRowColumn>
                  <TableRowColumn>{player.gender}</TableRowColumn>
                  <TableRowColumn>{player.score}</TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter
            adjustForCheckbox={this.state.table.showCheckboxes}
          >
            <TableRow>
              <TableRowColumn>Rank</TableRowColumn>
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