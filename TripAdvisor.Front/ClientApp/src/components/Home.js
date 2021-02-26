import React, { Component } from 'react';
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
        if ((places !== null) && (places.length !== 0)) {
            return (
                <section>
                    <h1>Destinations populaires</h1>
                    {
                        places.map(place => {
                            return <PlaceCard key={place.placeId} id={place.placeId} title={place.title} city={place.city} />;
                        })
                    }
                </section>
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
        return (
          <div>
                {Home.renderPlacesList(this.state.Places)}
          </div>
        );
  }
}
