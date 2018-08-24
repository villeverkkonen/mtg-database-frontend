import React, { Component } from 'react'
import cardService from './services/cards'
import Card from './components/Card'
import CardList from './components/CardList'
import ButtonList from './components/ButtonList'
import DraftCardList from './components/DraftCardList'

class App extends Component {
  constructor(props) {
    super(props)

    // Bind functions
    this.getCardsWithColor = this.getCardsWithColor.bind(this)
    this.playDraft = this.playDraft.bind(this)
    this.showImageOrCard = this.showImageOrCard.bind(this)
    this.showCard = this.showCard.bind(this)
    this.showCardForMobile = this.showCardForMobile.bind(this)
    this.mouseOver = this.mouseOver.bind(this)
    this.mouseOut = this.mouseOut.bind(this)

    // Check if using mobile with touch
    const touchsupport = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)
    this.state = {
      cards: [],
      draftCards: [],
      sets: [],
      showCard: null,
      mouseOver: false,
      hoverImageUrl: '',
      cardListColor: '',
      touchsupport: touchsupport,
      showLinkForId: ''
    }
  }

  componentDidMount() {
    let setsArray = []

    cardService
      .getSets()
      .then(response => {
        response.sets.map(function(set) {
          return(
            set.booster ?
              setsArray.push(set)
            :
              null
          )
        })
        setsArray.sort((a, b) => a.releaseDate < b.releaseDate)
        this.setState({
          sets: setsArray
        })
      })
  }

  // Get 5 random cards with chosen color
  getCardsWithColor = (color) => (event) => {
    event.preventDefault()

    cardService
      .getColor(color)
      .then(response => {
        // Add cards to array in state and clear possible hovering settings
        this.setState({
          cards: response.cards,
          draftCards: [],
          showCard: null,
          mouseOver: false,
          hoverImageUrl: '',
          cardListColor: color,
          showLinkForId: ''
        })
      })
  }

  // Get 15 draft cards for given set
  playDraft = (event) => {
    event.preventDefault()

    const set = document.getElementById('draft-select').value

    cardService
      .getDraftCards(set)
      .then(response => {
        this.setState({
          // Add draft cards to array in state and clear possible hovering settings
          cards: [],
          draftCards: response.cards,
          showCard: null,
          mouseOver: false,
          hoverImageUrl: '',
          cardListColor: '',
          showLinkForId: ''
        })
      })
  }

  // Hovering is not possible if using mobile, so when clicked with mobile, display image and button for show view
  showImageOrCard = (id, imageUrl) => (event) => {
    event.preventDefault()

    if (!this.state.touchsupport) {
      this.showCard(id)
    } else {
      if (this.state.hoverImageUrl === imageUrl) {
        this.setState({
          draftCards: [],
          mouseOver: false,
          showCard: null,
          cardListColor: '',
          showLinkForId: ''
        })
      } else {
        this.setState({
          draftCards: [],
          mouseOver: true,
          hoverImageUrl: imageUrl,
          showCard: null,
          cardListColor: '',
          showLinkForId: id
        })
      }
    }
  }

  // Two almost duplicate methods because other one needs event.preventDefault() and this won't work with it
  showCard = (id) => {
    cardService
      .getById(id)
      .then(response => {
        this.setState({
          draftCards: [],
          showCard: response.card,
          mouseOver: false,
          hoverImageUrl: '',
          showLinkForId: ''
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
          cards: [],
          draftCards: [],
          showCard: response.card,
          mouseOver: false,
          hoverImageUrl: '',
          showLinkForId: ''
        })
      })
  }

  // On desktop show card image when hovering the name
  mouseOver = (imageUrl) => (event) => {
    event.preventDefault()

    if (!this.state.touchsupport) {

      this.setState({
        mouseOver: true,
        hoverImageUrl: imageUrl,
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
        <ButtonList
          getCardsWithColor={this.getCardsWithColor}
          playDraft={this.playDraft}
          sets={this.state.sets}
        />

        {this.state.cards !== null ?
          <CardList
            cards={this.state.cards}
            showCardForMobile={this.showCardForMobile}
            showImageOrCard={this.showImageOrCard}
            mouseOver={this.mouseOver}
            mouseOut={this.mouseOut}
            color={this.state.cardListColor}
            showLinkForId={this.state.showLinkForId}
          />
        :
          null
        }

        {this.state.draftCards !== null ?
         <DraftCardList
          draftCards={this.state.draftCards}
        />
        :
          null
        }

        {this.state.showCard !== null ?
          <Card card={this.state.showCard} />
        :
          null
        }

        {this.state.mouseOver
        ?
          <div className="hoverImage">
            <img src={this.state.hoverImageUrl} alt="imageUrl" />
          </div>
        :
          null
        }
      </div>
    );
  }
}

export default App;
