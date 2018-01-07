import 'whatwg-fetch';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import Reboot from 'material-ui/Reboot';

import { OrderStatusView, OrderView } from './customer';
import { WorkerView, QueueView, CompletedView, ViewOrderView } from './admin';

const theme = createMuiTheme({
	palette: {
		primary: blue
	}
});

class App extends Component {
	componentDidMount() {
		// fetch('http://localhost:3000/users')
		// 	.then(res => res.json())
		// 	.then(users => this.setState({ users }));
	}

	render() {
		return (
			<MuiThemeProvider theme={theme}>
				<Reboot />
				<BrowserRouter>
					<div>
						<Route exact path="/" component={WorkerView} />
						<Route path="/view/:id" component={ViewOrderView} />
						<Route path="/queue" component={QueueView} />
						<Route path="/completed" component={CompletedView} />
						<Route path="/order" component={OrderView} />
						<Route path="/order-status/:id" component={OrderStatusView} />
					</div>
				</BrowserRouter>
			</MuiThemeProvider>
		);
	}
}

export default App;
