import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import SvgIcon from 'material-ui/SvgIcon';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const handleGoToHome = () => {
  document.location = "/#/";
}

const handleGoToBattle = () => {
  document.location = '/#/battle';
}

const handleGoToPlayerAdd = () => {
  document.location = '/#/player/add';
}

const styles = {
  color: {
    color: 'white',
  }
};

const HomeIcon = (props) => (
  <SvgIcon {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </SvgIcon>
);

const Header = () => (
  <AppBar
    title={<span>Table Tennis Battlefield</span>}
    onLeftIconButtonTouchTap={handleGoToHome}
    iconElementLeft={<IconButton><HomeIcon /></IconButton>}
    iconElementRight={<ToolbarGroup>
                        <FlatButton style={styles.color} onTouchTap={handleGoToHome} label="Player Ranks" />
                        <FlatButton style={styles.color} onTouchTap={handleGoToBattle} label="Enter Results" />
                        <FlatButton style={styles.color} onTouchTap={handleGoToPlayerAdd} label="Add a player" />
                      </ToolbarGroup>}
  />
)

export default Header;