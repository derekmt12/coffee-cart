import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Button from 'material-ui/Button';
import Badge from 'material-ui/Badge';
import { withRouter } from 'react-router-dom';

class NavigationBarComponent extends Component {
	goTo = (url) => {
		return (e) => {
			e.preventDefault();
			this.props.history.push(url);
		};
	}

	render() {
		const { uncompletedOrderCount, completedOrderCount } = this.props;
		return (
			<AppBar position="static">
				<Toolbar>
					<IconButton color="contrast" aria-label="Menu"><MenuIcon /></IconButton>
					<Typography type="title" color="inherit">Title</Typography>
					<Button color="contrast" aria-label="Queue" onClick={this.goTo('/queue')}>
						{uncompletedOrderCount ? <Badge color="accent" badgeContent={uncompletedOrderCount}>Queue</Badge> : 'Queue'}
					</Button>
					<Button color="contrast" aria-label="Completed" onClick={this.goTo('/completed')}>
						{completedOrderCount ? <Badge color="accent" badgeContent={completedOrderCount}>Completed</Badge> : 'Completed'}
					</Button>
				</Toolbar>
			</AppBar>
		);
	}
}

export const NavigationBar = withRouter(NavigationBarComponent);