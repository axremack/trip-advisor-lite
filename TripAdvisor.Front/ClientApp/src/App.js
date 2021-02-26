import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Login } from './components/Login';
import { PlaceCard } from './components/PlaceCard';
import { PlacePage } from './components/PlacePage';
import { PlaceForm } from './components/PlaceForm';
import { ViewForm } from './components/ViewForm';
import { UserCommentCard } from './components/UserCommentCard';
import { UserCardDetailed } from './components/UserCardDetailed';
import { UserPage } from './components/UserPage';
import { Register } from './components/Register';
import { SearchPage } from './components/SearchPage';

export default class App extends Component {
	static displayName = App.name;

	constructor(props) {
		super(props);

		this.state = {
			token: localStorage.getItem('user')
		};

		this.setToken = this.setToken.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			token: localStorage.getItem('user')
		});
	}

	setToken = (token) => {
		this.setState({
			token: token
		});
	}

	render() {
		return (
			<Layout appState={this.state} setToken={this.setToken}>
				<Route exact path='/' component={Home} />
				<Route exact path='/place/:id' component={PlacePage} />
				<Route exact path='/place/addcomment' component={ViewForm} />
				<Route exact path='/place/addplace' component={PlaceForm} />
				<Route exact path='/user/:id' render={(props) => <UserPage {...props} appState={this.state} />} />
				<Route exact path='/search/:text' component={SearchPage} />
				<Route path='/counter' component={Counter}/>
				<Route path='/fetch-data' component={FetchData}/>
				<Route path='/login' render={(props) => <Login {...props} setToken={this.setToken}/>} />
				<Route path='/register' component={Register} />
			</Layout>
		);
	}
}
