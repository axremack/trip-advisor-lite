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
import { InscriptionForm } from './components/InscriptionForm';
import { UserCommentCard } from './components/UserCommentCard';
import { UserCardDetailed } from './components/UserCardDetailed';
import { UserPage } from './components/UserPage';
import { Register } from './components/Register';

export default class App extends Component {
	static displayName = App.name;

	render() {
		return (
			<Layout>
				<Route exact path='/' component={PlacePage} />
				<Route exact path='/user' component={UserPage}/>
				<Route path='/counter' component={Counter}/>
				<Route path='/fetch-data' component={FetchData}/>
				<Route path='/login' component={Login} />
				<Route path='/register' component={Register} />
			</Layout>
		);
	}
}
