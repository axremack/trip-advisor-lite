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
            Places: [],
            PopularPlaces: [],
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
        this.populatePlacesList();
    }

    static renderPlacesList(places) {
        if ((places !== null) && (places.length !== 0)) {
            return (
                places.map(place => {
                    return <PlaceCard key={place.placeId} id={place.placeId} title={place.title} city={place.city} />;
                }));
        }
        else {
            return (<div className='jumbotron '><h1 className="display-4">Aucun lieu pour le moment</h1></div>);
        }
    }

    async populatePlacesList() {
        const res = await fetch('places', {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        });

        if (res.ok) {
            res.json().then(data => this.setState({ Places: data }));
        } else {
            this.setState({ Places: null });
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
        console.log(this.state.PopularPlaces);
    }

    render() {
        const isLoggedIn = this.state.token;
        let contenu = null;
        console.log(this.state.PopularPlaces);

        if (isLoggedIn) {
            contenu = <Container>
                        <Container className="mb-5">
                            <Row className="mb-3">
                                <h1>Destinations populaires</h1>
                            </Row>
                            <Row>
                                {Home.renderPlacesList(this.state.PopularPlaces)}
                            </Row>
                        </Container>
                        <Container className="mb-5">
                            <Row className="mb-3">
                                <h1>Suggestions</h1>
                            </Row>
                            <Row>
                                {Home.renderPlacesList(this.state.Places)}
                            </Row>
                        </Container>
                        <Container className="mb-5">
                            <Row className="mb-3">
                                <h1>Vos lieux</h1>
                            </Row>
                            <Row>
                                {Home.renderPlacesList(this.state.Places.filter(place => (place.ownerId !== null) && (place.ownerId === this.state.token)))}
                            </Row>
                        </Container>
                      </Container>
        } else {
            contenu = <Container className="mb-5">
                            <Row className="mb-3">
                                <h1>Destinations populaires</h1>
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
