import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';

import { submitOrder } from '../api/orderingSocket';

class OrderViewComponent extends Component {
  static propTypes = {
    history: PropTypes.any
  };

  state = {
    order: {
      name: '',
      description: '',
      status: 'submitted'
    }
  };

  onSubmit = e => {
    e.preventDefault();

    submitOrder(this.state.order, order => {
      this.props.history.push(`/order-status/${order.id}`);
    });
  };

  onNameChange = e => {
    const name = e.target.value;
    this.setState(prevState => ({
      ...prevState,
      order: {
        ...prevState.order,
        name
      }
    }));
  };

  onDescriptionChange = e => {
    const description = e.target.value;
    this.setState(prevState => ({
      ...prevState,
      order: {
        ...prevState.order,
        description
      }
    }));
  };

  render() {
    const { order } = this.state;
    return (
      <form>
        <h2>Order Form</h2>
        <div>
          <TextField
            value={order.name}
            label="Name"
            onChange={this.onNameChange}
          />
        </div>
        <div>
          <TextField
            value={order.description}
            label="Order"
            onChange={this.onDescriptionChange}
          />
        </div>
        <Button variant="contained" type="submit" onClick={this.onSubmit}>
          Submit
        </Button>
      </form>
    );
  }
}

export const OrderView = withRouter(OrderViewComponent);
