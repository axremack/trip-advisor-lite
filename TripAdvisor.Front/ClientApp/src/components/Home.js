import React, { Component } from 'react';
import { PlaceCard } from './PlaceCard';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            Places: [],
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
                <div className="placeList">
                    {
                        places.map(place => {
                            return <PlaceCard key={place.placeId} id={place.placeId} title={place.title} city={place.city} />;
                        })
                    }
                </div>
            );
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

    render() {
        const isLoggedIn = this.state.token;
        let contenu = null;

        if (isLoggedIn) {
            contenu = <section>
                <section>
                    <h1>Consultés récemment</h1>
                    {Home.renderPlacesList(this.state.Places)}
                </section>
                <section>
                    <h1>Suggestions</h1>
                    {Home.renderPlacesList(this.state.Places)}
                </section>
                <section>
                    <h1>Près de chez vous</h1>
                    {Home.renderPlacesList(this.state.Places)}
                </section>
            </section>;
        } else {
            contenu = <section>
                <h1>Destinations populaires</h1>
                {Home.renderPlacesList(this.state.Places)}
            </section>;
        }

        return (
          <div>
                {contenu}
          </div>
        );
  }
}
