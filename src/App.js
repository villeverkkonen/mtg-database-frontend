import React, { Component } from 'react';
import cardService from './services/cards'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      cardName: ''
    }
  }

  componentDidMount() {
    cardService
      .getColor("red")
      .then(response => {
        let cardArray = []
        for (let i = 0; i < response.data.cards.length; i++) {
          cardArray.push(response.data.cards[i].name)
        }

        this.setState({
          cards: cardArray
        })
      })
  }

  render() {
    return (
      <div>
        <ul>
          {
            this.state.cards.map(function(cardName, index) {
              return <li key={index}>{cardName}</li>
            })
          }
        </ul>
      </div>
    );
  }
}

export default App;
