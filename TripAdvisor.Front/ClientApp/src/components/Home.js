import React, { Component } from 'react';
import axios from 'axios';
import { PlaceCard } from './PlaceCard';

export class Home extends Component {
    static displayName = Home.name;

    constructor() {
        super();
        this.state = {
            Places: []
        }
    }

    componentDidMount() {
        this.populatePlacesList();
    }

    static renderPlacesList(places) {
        console.log(places);
        if ((places != null) && (places.length != 0)) {
            return (
                <section>
                    <h1>Destinations populaires</h1>
                    {
                        places.map(place => {
                            return <PlaceCard key={place.placeId} title={place.title} city={place.city} />;
                        })
                    }
                </section>
            );
        }
        else {
            return (<h1 style={{ color: '#FF0000' }}>Pas de lieu trouve</h1>);
        }
    }

    async populatePlacesList() {
        const res = await fetch('places', {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        });
        console.log(res);

        if (res.ok) {
            res.json().then(data => this.setState({ Places: data }));
        } else {
            this.setState({ Places: null });
        }
    }

    render() {
        return (
          <div>
                {Home.renderPlacesList(this.state.Places)}
          </div>
        );
  }
}
