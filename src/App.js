import React, { Component } from 'react';
import cardService from './services/cards'
import Card from './components/Card'
import CardList from './components/CardList'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      showCard: null
    }
  }

  // componentDidMount() {
  // }

  getCardsWithColor = (event) => {
    event.preventDefault()
    cardService
      .getColor(event.target.value)
      .then(response => {
        let cardArray = []
        for (let i = 0; i < response.cards.length; i++) {
          cardArray.push(response.cards[i])
        }

        this.setState({
          cards: cardArray
        })
      })
  }

  showCard = (id) => (event) => {
    event.preventDefault()

    cardService
      .getById(id)
      .then(response => {
        this.setState({
          showCard: response.card
        })
      })
      console.log("")
      console.log("showCard: ")
      console.log(this.state.showCard)
      console.log("")
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.getCardsWithColor} value='white'>White</button>
          <button onClick={this.getCardsWithColor} value='blue'>Blue</button>
          <button onClick={this.getCardsWithColor} value='black'>Black</button>
          <button onClick={this.getCardsWithColor} value='red'>Red</button>
          <button onClick={this.getCardsWithColor} value='green'>Green</button>
        </div>

        {this.state.showCard === null ?
        <div className="cardList">
          <CardList cards={this.state.cards} showCard={this.showCard.bind(this)} />
        </div>
        :
        this.state.showCard.name
        }
      </div>
    );
  }
}

export default App;
