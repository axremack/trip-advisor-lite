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
			token: localStorage.getItem('user'),
			lastToken: null
		};
	}

	static getDerivedStateFromProps(props, state) {
		if (props.token !== state.lastToken) {
			return {
				token: localStorage.getItem('user'),
				lastToken: props.token
			};
		}

		return null;
	}

	setToken = (token) => {
		this.setState({
			token: token
		});
	}

	render() {
		return (
			<Layout token={this.state.token} setToken={this.setToken}>
				<Route exact path='/' component={Home} />
				<Route exact path='/placecard' component={PlaceCard} />
				<Route exact path='/place/:id' component={PlacePage} />
				<Route exact path='/place/:id/addcomment' render={(props) => <ViewForm {...props} userId={this.state.token} />} />
				<Route exact path='/user/:id/addplace' render={(props) => <PlaceForm {...props} userId={this.state.token} />} />
				<Route exact path='/user/:id' render={(props) => <UserPage {...props} userId={this.state.token} />} />
				<Route exact path='/search/:text' component={SearchPage} />
				<Route path='/counter' component={Counter}/>
				<Route path='/fetch-data' component={FetchData}/>
				<Route path='/login' render={(props) => <Login {...props} setToken={this.setToken}/>} />
				<Route path='/register' component={Register} />
			</Layout>
		);
	}
}
