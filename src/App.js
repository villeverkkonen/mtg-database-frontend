import React, { Component } from 'react'
import cardService from './services/cards'
import Card from './components/Card'
import CardList from './components/CardList'

class App extends Component {
  constructor(props) {
    super(props)
    // Check if using mobile with touch
    const touchsupport = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)
    this.state = {
      cards: [],
      showCard: null,
      mouseOver: false,
      hoverImageUrl: '',
      cardListColor: '',
      touchsupport: touchsupport,
      showLinkForId: ''
    }
  }

  // Get 5 random cards with chosen color
  getCardsWithColor = (event) => {
    event.preventDefault()
    const color = event.target.value

    cardService
      .getColor(color)
      .then(response => {
        // Add cards to array in state and clear hovering settings
        this.setState({
          cards: response.cards,
          showCard: null,
          mouseOver: false,
          hoverImageUrl: '',
          cardListColor: color
        })
      })
  }

  // Hovering is not possible if using mobile, so when clicked with mobile, display image and button for show view
  showImageOrCard = (id, imageUrl) => (event) => {
    event.preventDefault()

    if (!this.state.touchsupport) {
      this.showCard(id)
    } else {
      this.setState({
        mouseOver: true,
        hoverImageUrl: imageUrl,
        showLinkForId: id
      })
    }
  }

  // Two almost duplicate methods because other one needs event.preventDefault() and this won't work with it
  showCard = (id) => {
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

  // Without preventing default event (clicked from button) this activates straight away when clicked on a card name
  showCardForMobile = (id) => (event) => {
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

  // On desktop show card image when hovering the name
  mouseOver = (imageUrl) => (event) => {
    event.preventDefault()

    if (!this.state.touchsupport) {

      this.setState({
        mouseOver: true,
        hoverImageUrl: imageUrl
      })
    }
  }

  // Hide the card image when not hovering the name
  mouseOut = (event) => {
    event.preventDefault()

    if (!this.state.touchsupport) {

      this.setState({
        mouseOver: false,
        hoverImageUrl: ''
      })
    }
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
            showCardForMobile={this.showCardForMobile}
            showImageOrCard={this.showImageOrCard.bind(this)}
            mouseOver={this.mouseOver.bind(this)}
            mouseOut={this.mouseOut.bind(this)}
            color={this.state.cardListColor}
            showLinkForId={this.state.showLinkForId}
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
