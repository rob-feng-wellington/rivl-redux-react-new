import React from 'react';

import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Done from 'material-ui/svg-icons/action/done';
import CircularProgress from 'material-ui/CircularProgress';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    float: 'left'
  },
  gridList: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 800,
    height: 220,
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)'
  },
};

const AvatarList = ({avatars, isFetching, onSelect, selected}) => {
  if(isFetching) {
    return <CircularProgress size={80} thickness={5} />;
  } 
  return (
    <div style={styles.root}>
      <GridList cellHeight={100} style={styles.gridList} cols={8.2}>
        {avatars.map((tile) => (
          <GridTile
            key={tile.id}
            title={tile.name}
            actionIcon={selected !== '' && selected === tile.id ? <IconButton><Done color="rgb(0, 188, 212)" /></IconButton> : null}
            titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
            onTouchTap={() => onSelect(tile.id)}
          >
            <img src={tile.path} />
          </GridTile>
        ))}
      </GridList>
    </div>
  );
};

export default AvatarList;
