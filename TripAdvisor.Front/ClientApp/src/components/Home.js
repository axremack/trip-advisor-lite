import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { PlaceCard } from './PlaceCard';

export class Home extends Component {
    static displayName = Home.name;
    
    ListPlaces(text) {
        const [places, setPlaces] = useState([]);
        const [searchText, setSearchText] = useState(null);

        setSearchText(text);

        useEffect(() => {
            fetch('http://localhost:44383/places', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => setPlaces(data));
        }, []);

        const listPlaces = places
            .flatMap(place => ({ ...place, id: place.PlaceId, title: place.Title, city: place.City }))
            .map(card => <PlaceCard key={card.id} title={card.title} city={card.city} />);

        return listPlaces;
    }


    render() {
        /* !!! NE MARCHE PAS !!!
        let [places, setPlaces] = useState([]);
        const [searchText, setSearchText] = useState(null);

        function createListPlaces() {
            useEffect(() => {
                fetch('http://localhost:44383/places', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => setPlaces(data.filter(place => place.State.toLowerCase().includes(searchText))));
            }, [searchText]);
        }

        const search = ""; //text => { setSearchText(text) };
        
        const listPlaces = places
            .flatMap(place => ({ ...place, id: place.PlaceId, title: place.Title, city: place.City }))
            .map(card => <PlaceCard key={card.id} title={card.title} city={card.city} />);
        */
        return (
          <div>
            <h1>Hello, world!</h1>
            <p>Welcome to your new single-page application, built with:</p>
            <ul>
              <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
              <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
              <li><a href='http://getbootstrap.com/'>Bootstrap</a> for layout and styling</li>
            </ul>
            <p>To help you get started, we have also set up:</p>
            <ul>
              <li><strong>Client-side navigation</strong>. For example, click <em>Counter</em> then <em>Back</em> to return here.</li>
              <li><strong>Development server integration</strong>. In development mode, the development server from <code>create-react-app</code> runs in the background automatically, so your client-side resources are dynamically built on demand and the page refreshes when you modify any file.</li>
              <li><strong>Efficient production builds</strong>. In production mode, development-time features are disabled, and your <code>dotnet publish</code> configuration produces minified, efficiently bundled JavaScript files.</li>
            </ul>
            <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
          </div>
        );
  }
}
