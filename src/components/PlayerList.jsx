import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { getPlayersByGender, getIsFetching, getErrorMessage } from '../reducer';
import * as actions from '../action_creator';
import FetchError from './FetchError';
import GenderFilter from './GenderFilter';
import sortBy from 'lodash/sortBy';
import reverse from 'lodash/reverse';
import clone from 'lodash/clone';


// highcharts
const ReactHighcharts = require('react-highcharts');

// Note that Highcharts has to be in the codebase already
// Highcharts more
const HighchartsMore = require('highcharts-more');
HighchartsMore(ReactHighcharts.Highcharts);

const scoreboard_config = {
  chart: {
    type: 'bubble',
    plotBorderWidth: 1,
    zoomType: 'xy',
    height: 800
  },

  legend: {
    enable: false
  },

  title: {
    text: 'score board'
  },

  subtitle: {
    text: 'score board for players'
  },

  xAxis: {
    allowDecimals: false,
    title: {
            text: 'Player rank'
        },
        labels: {
            format: '{value}'
        }
    },

    yAxis: {
        startOnTick: false,
        endOnTick: false,
        title: {
            text: 'Player score'
        },
        labels: {
            format: '{value}' 
        },
        maxPadding: 0.2,
        plotLines: [{
            color: 'black',
            dashStyle: 'dot',
            width: 2,
            value: 1500,
            label: {
                align: 'right',
                style: {
                    fontStyle: 'italic'
                },
                text: 'Initial start point',
                x: -10
            },
            zIndex: 3
        }]
    },

    tooltip: {
        useHTML: true,
        headerFormat: '<table>',
        pointFormat: '<tr><th colspan="2"><h3>{point.full_name}</h3></th></tr>' +
            '<tr><th>Rank:</th><td>{point.x}</td></tr>' +
            '<tr><th>Points:</th><td>{point.score}</td></tr>',
        footerFormat: '</table>',
        followPointer: false
    },

    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: '{point.first_name}'
            }
        },
        bubble:{
            minSIze:'10%',
            maxSize:'10%'
        }
    },

    series: [{
      data: [{}]
    }]
};

/*const Player = ({
  onClick,
  first_name,
  last_name,
  gender,
  score
}) => (
  <li> 
    {first_name} {last_name} {gender} {score}
    <button onClick={onClick}>
      1up
    </button>
  </li>
);

const PlayerList = ({
  players,
  onUpClick
}) => (
  <ul>
    {players.map(player => 
      <Player
        key={player.id}
        {...player}
        onClick={() => onUpClick(player.id)}
      />
    )}
  </ul>
);*/

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
    this.fetchDone = this.fetchDone.bind(this);
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

  fetchDone(chart) {
    const { players } = this.props;
    if(players.length > 0) {
      //only update chart once players fetched
      let list = reverse(sortBy(players, 'score'));

      list.forEach((player, index) => {
        player.x = index + 1;
        player.y = player.score;
        player.full_name = player.first_name + " " + player.last_name;
      });

      chart.series[0].setData(list, true);
    }
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
      <div className="chartWrapper">
        <GenderFilter />
        <ReactHighcharts config={scoreboard_config} callback={this.fetchDone} ref="chart"></ReactHighcharts>
{/*        <PlayerList 
          players = { players }
          onUpClick={updateScore} 
        />*/}
      </div>
    );
  }
}

FilteredPlayerList = withRouter(connect(
  mapStateToProps,
  actions
)(FilteredPlayerList));

export default FilteredPlayerList;