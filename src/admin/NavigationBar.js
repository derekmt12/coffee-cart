import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import { withRouter } from 'react-router-dom';

class NavigationBarComponent extends Component {
  static propTypes = {
    history: PropTypes.any,
    uncompletedOrderCount: PropTypes.number,
    completedOrderCount: PropTypes.number
  };

  goTo = url => {
    return e => {
      e.preventDefault();
      this.props.history.push(url);
    };
  };

  render() {
    const { uncompletedOrderCount, completedOrderCount } = this.props;
    return (
      <AppBar position="static">
        <Toolbar>
          <IconButton color="default" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit">
            Title
          </Typography>
          <Button aria-label="Queue" onClick={this.goTo('/admin/queue')}>
            {uncompletedOrderCount ? (
              <Badge badgeContent={uncompletedOrderCount}>Queue</Badge>
            ) : (
              'Queue'
            )}
          </Button>
          <Button
            aria-label="Completed"
            onClick={this.goTo('/admin/completed')}
          >
            {completedOrderCount ? (
              <Badge badgeContent={completedOrderCount}>Completed</Badge>
            ) : (
              'Completed'
            )}
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export const NavigationBar = withRouter(NavigationBarComponent);
