import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';

import './custom.css'
import CampaignMain from './components/CampaignMain/CampaignMain';

export default class App extends Component {
  static displayName = App.name;

  constructor(props){
    super(props);
    this.state = {
      accountBalance : 2000
    }
  }

  render () {
    return (
      <Layout accountBalance={this.state.accountBalance}>
        <Route exact path='/' render={(props) => (<CampaignMain {...props} accountBalance={this.state.accountBalance} accountBalanceSet = {(value) => this.setState({accountBalance : value})} />)}/>
      </Layout>
    );
  }
}
