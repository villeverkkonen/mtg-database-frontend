import React, { Component } from 'react'
import cardService from './services/cards'
import Card from './components/Card'
import CardList from './components/CardList'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      showCard: null,
      mouseOver: false,
      hoverImageUrl: '',
      cardListColor: ''
    }
  }

  getCardsWithColor = (event) => {
    event.preventDefault()
    const color = event.target.value

    cardService
      .getColor(color)
      .then(response => {
        let cardArray = []
        for (let i = 0; i < response.cards.length; i++) {
          cardArray.push(response.cards[i])
        }

        this.setState({
          cards: cardArray,
          showCard: null,
          mouseOver: false,
          hoverImageUrl: '',
          cardListColor: color
        })
      })
    

  }

  showCard = (id) => (event) => {
    event.preventDefault()

    cardService
      .getById(id)
      .then(response => {
        this.setState({
          showCard: response.card,
          mouseOver: false,
          hoverImageUrl: ''
        })
      })
  }

  mouseOver = (hoverImageUrl) => (event) => {
    event.preventDefault()

    this.setState({
      mouseOver: true,
      hoverImageUrl: hoverImageUrl
    })
  }

  mouseOut = (event) => {
    event.preventDefault()

    this.setState({
      mouseOver: false,
      hoverImageUrl: ''
    })
  }

  render() {
    return (
      <div>
        <div className="colorButtons">
          <button onClick={this.getCardsWithColor} value='white' className='btn btn-default buttonWhite'>White</button>
          <button onClick={this.getCardsWithColor} value='blue' className='btn btn-default buttonBlue'>Blue</button>
          <button onClick={this.getCardsWithColor} value='black' className='btn btn-default buttonBlack'>Black</button>
          <button onClick={this.getCardsWithColor} value='red' className='btn btn-default buttonRed'>Red</button>
          <button onClick={this.getCardsWithColor} value='green' className='btn btn-default buttonGreen'>Green</button>
        </div>

        {this.state.showCard === null ?
        <div className="cardList">
          <CardList
            cards={this.state.cards}
            showCard={this.showCard.bind(this)}
            mouseOver={this.mouseOver.bind(this)}
            mouseOut={this.mouseOut.bind(this)}
            color={this.state.cardListColor}
          />
        </div>
        :
        <Card card={this.state.showCard} />
        }
        {this.state.mouseOver
        ?
          <div className="hoverImage">
            <img src={this.state.hoverImageUrl} alt="imageUrl" />
          </div>
        :
        null}

      </div>
    );
  }
}

export default App;
