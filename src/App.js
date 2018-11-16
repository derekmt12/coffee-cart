import 'whatwg-fetch';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
//import Reboot from '@material-ui/core/Reboot';

import { OrderStatusView } from './customer/OrderStatusView';
import { OrderView } from './customer/OrderView';
import { WorkerView } from './admin/WorkerView';
import { AdminContainer } from './admin/AdminContainer';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: '#2196f3',
      contrastText: '#fff'
    }
  }
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        {/* <Reboot /> */}
        <BrowserRouter>
          <div>
            <Route exact path="/" component={WorkerView} />
            <Route path="/admin" component={AdminContainer} />
            <Route path="/order" component={OrderView} />
            <Route path="/order-status/:id" component={OrderStatusView} />
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
