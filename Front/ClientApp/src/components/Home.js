import React, { Component } from 'react';
import {
    Container,
    Row
} from 'reactstrap';
import { PlaceCard } from './PlaceCard';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            PopularPlaces: [],
            SuggestedPlaces: [],
            VisitedPlaces: [],
            token: props.userId
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.userId !== state.token) {
            return {
                token: props.userId
            };
        }

        return null;
    }

    componentDidMount() {
        this.populatePopularPlacesList();
        this.populateSuggestedPlacesList();
        this.populateVisitedPlacesList();
    }

    static renderPlacesList(places) {
        if ((places !== null) && (places.length !== 0)) {
            return (
                places.map(place => {
                    return <PlaceCard key={place.placeId} id={place.placeId} title={place.title} city={place.city} />;
                }));
        }
        else {
            return (<div className='jumbotron '><h3>Aucun lieu pour le moment</h3></div>);
        }
    }

    async populatePopularPlacesList() {
        const res = await fetch('places/popular', {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        });

        if (res.ok) {
            res.json().then(data => this.setState({ PopularPlaces: data }));
        } else {
            this.setState({ PopularPlaces: null });
        }
    }

    async populateSuggestedPlacesList() {
        if (this.state.token) {
            const res = await fetch('places/suggestions/' + this.state.token, {
                method: 'GET',
                headers: { 'Content-type': 'application/json' }
            });

            if (res.ok) {
                res.json().then(data => this.setState({ SuggestedPlaces: data }));
            } else {
                this.setState({ SuggestedPlaces: null });
            }
        }
    }

    async populateVisitedPlacesList() {
        if (this.state.token) {
            const res = await fetch('places/visited/' + this.state.token, {
                method: 'GET',
                headers: { 'Content-type': 'application/json' }
            });

            if (res.ok) {
                res.json().then(data => this.setState({ VisitedPlaces: data }));
            } else {
                this.setState({ VisitedPlaces: null });
            }
        }
    }

    render() {
        const isLoggedIn = this.state.token;
        let contenu = null;

        if (isLoggedIn) {
            contenu = <Container>
                        <Container className="mb-5">
                            <Row className="mb-3">
                                <h2>Destinations populaires</h2>
                            </Row>
                            <Row>
                                {Home.renderPlacesList(this.state.PopularPlaces)}
                            </Row>
                        </Container>
                        <Container className="mb-5">
                            <Row className="mb-3">
                                <h2>Suggestions</h2>
                            </Row>
                            <Row>
                                {Home.renderPlacesList(this.state.SuggestedPlaces)}
                            </Row>
                        </Container>
                        <Container className="mb-5">
                            <Row className="mb-3">
                                <h2>Lieux visités</h2>
                            </Row>
                            <Row>
                                {Home.renderPlacesList(this.state.VisitedPlaces)}
                            </Row>
                        </Container>
                      </Container>
        } else {
            contenu = <Container className="mb-5">
                            <Row className="mb-3">
                                <h2>Destinations populaires</h2>
                            </Row>
                            <Row>
                                {Home.renderPlacesList(this.state.PopularPlaces)}
                            </Row>
                      </Container>
        }

        return (
            <Container>
                {contenu}
            </Container>
        );
  }
}
