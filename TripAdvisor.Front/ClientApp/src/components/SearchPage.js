import React, { Component } from 'react';
import { PlaceCard } from './PlaceCard';

export class SearchPage extends Component {
    static displayName = SearchPage.name;

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
            return (<div className='jumbotron '><h1 className="display-4">Aucun lieu ne correspond à votre recherche</h1></div>);
        }
    }

    async populatePlacesList() {
        const res = await fetch('places', {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        });

        if (res.ok) {
            const searchText = this.props.match.params.text.toLowerCase();

            res.json().then(data => this.setState({
                Places: data.filter(place =>
                    (
                        place.street.toLowerCase().includes(searchText) ||
                        place.city.toLowerCase().includes(searchText) ||
                        place.state.toLowerCase().includes(searchText)
                    )
                )
            }));
        } else {
            this.setState({ Places: null });
        }
    }

    render() {
        return (
            <div>
                <section>
                    <h1>R�sultats de la recherche</h1>
                    {SearchPage.renderPlacesList(this.state.Places)}
                </section>
            </div>
        );
  }
}
