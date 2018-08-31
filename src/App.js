import React, { Component } from 'react'
import cardService from './services/cards'
import Card from './components/Card'
import CardList from './components/CardList'
import NavBar from './components/NavBar'
import DraftCardList from './components/DraftCardList'
import DraftDeck from './components/DraftDeck'

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
    this.addCardToDeck = this.addCardToDeck.bind(this)
    this.shuffleNewBoosters = this.shuffleNewBoosters.bind(this)

    // Check if using mobile with touch
    const touchsupport = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)
    this.state = {
      cards: [],
      boosters: [],
      draftDeck: [],
      sets: [],
      mouseOver: false,
      showDraftDeck: false,
      loadingDraft: false,
      showCard: null,
      hoverImageUrl: '',
      cardListColor: '',
      showLinkForId: '',
      boosterIndex: 0,
      draftRound: 0,
      touchsupport: touchsupport
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
          boosters: [],
          showCard: null,
          mouseOver: false,
          showDraftDeck: false,
          hoverImageUrl: '',
          cardListColor: color,
          showLinkForId: '',
          boosterIndex: 0,
          draftRound: 0,
        })
      })
  }

  // Get 8 boosters with 15 draft cards each for given set
  playDraft = async (event) => {
    event.preventDefault()

    // Show loading text while getting the boosters from API
    this.setState({ loadingDraft: true})

    const set = document.getElementById('draft-select').value

    // Get 8 boosters
    for (let i = 0; i < 8; i++) {
      await cardService
      .getBooster(set)
      .then(response => {
        const booster = [response.cards]
        this.setState({
          boosters: this.state.boosters.concat(booster),
          loadingDraft: false
        })
      })
    }

    this.setState({
      // Add draft cards to array in state and clear possible other settings
      cards: [],
      showCard: null,
      mouseOver: false,
      showDraftDeck: false,
      hoverImageUrl: '',
      cardListColor: '',
      showLinkForId: '',
      boosterIndex: 0,
      draftRound: 1
    })
  }

  shuffleNewBoosters = async (draftRound) => {
    // Show loading text while getting the boosters from API
    this.setState({ loadingDraft: true})

    const set = document.getElementById('draft-select').value

    // Get 8 boosters
    for (let i = 0; i < 8; i++) {
      await cardService
      .getBooster(set)
      .then(response => {
        const booster = [response.cards]
        this.setState({
          boosters: this.state.boosters.concat(booster),
          loadingDraft: false
        })
      })
    }

    this.setState({
      // Add draft cards to array in state and clear possible other settings
      cards: [],
      showCard: null,
      mouseOver: false,
      hoverImageUrl: '',
      cardListColor: '',
      showLinkForId: '',
      boosterIndex: 0,
      draftRound: draftRound
    })
  }

  // Hovering is not possible if using mobile, so when clicked with mobile, display image and button for show view
  showImageOrCard = (id, imageUrl) => (event) => {
    event.preventDefault()

    // If not using mobile and clicked on a card name, show the card
    if (!this.state.touchsupport) {
      this.showCard(id)
    } else {
      // For mobile, if this card is already clicked, show the card
      if (this.state.hoverImageUrl === imageUrl) {
        this.setState({
          cards: [],
          boosters: [],
          mouseOver: false,
          showDraftDeck: false,
          showCard: null,
          cardListColor: '',
          showLinkForId: '',
          boosterIndex: 0,
          draftRound: 0,
        })
      // If first click, show the hover image
      } else {
        this.setState({
          boosters: [],
          mouseOver: true,
          showDraftDeck: false,
          hoverImageUrl: imageUrl,
          showCard: null,
          cardListColor: '',
          showLinkForId: id,
          boosterIndex: 0,
          draftRound: 0,
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
          cards: [],
          boosters: [],
          showCard: response.card,
          mouseOver: false,
          showDraftDeck: false,
          hoverImageUrl: '',
          showLinkForId: '',
          boosterIndex: 0,
          draftRound: 0,
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
          boosters: [],
          showCard: response.card,
          mouseOver: false,
          showDraftDeck: false,
          hoverImageUrl: '',
          showLinkForId: '',
          boosterIndex: 0,
          draftRound: 0,
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

  addCardToDeck = (card, boosterIndex, cardIndex) => async (event) => {
    event.preventDefault()

    let boosterIndexIncrement = await this.state.boosterIndex
    if (boosterIndexIncrement === 7) {
      boosterIndexIncrement = 0
    } else {
      boosterIndexIncrement += 1
    }

    // Remove chosen card from booster. Using index over ID because there might be duplicate cards in boosters
    const boosters = this.state.boosters

    // Remove one random card from every booster
    boosters.map(function(booster, index) {
      if (boosterIndex === index) {
        booster = booster.filter((x, i) => i !== cardIndex)
        return boosters[index] = booster
      } else {
        const removedIndex = Math.floor(Math.random() * Math.floor(booster.length))
        booster = booster.filter((x, i) => i !== removedIndex)
        return boosters[index] = booster
      }
    })

    await this.setState({
      draftDeck: this.state.draftDeck.concat(card),
      boosters: boosters,
      boosterIndex: boosterIndexIncrement
    })

    if (this.state.boosters[0].length === 0 && this.state.draftRound < 3) {
      this.shuffleNewBoosters(this.state.draftRound + 1)
    } else {
      this.setState({draftRound: 3})
    }
  }

  // Button to show drafted cards
  showDraftDeck = (event) => {
    event.preventDefault()

    this.setState({
      cards: [],
      boosters: [],
      showCard: null,
      mouseOver: false,
      showDraftDeck: true,
      hoverImageUrl: '',
      showLinkForId: '',
      cardListColor: ''
    })
  }

  render() {
    return (
      <div>
        <NavBar
          getCardsWithColor={this.getCardsWithColor}
          playDraft={this.playDraft}
          sets={this.state.sets}
          draftDeck={this.state.draftDeck}
          showDraftDeck={this.showDraftDeck}
        />

        {this.state.loadingDraft
        ?
          <div>
            <p id="loadingDraftInfo">Loading...</p>
          </div>
        :
          null
        }

        {this.state.showDraftDeck
        ?
          <DraftDeck draftDeck={this.state.draftDeck} />
        :
          null
        }

        {this.state.cards.length > 0
        ?
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

        {this.state.boosters.length > 0
        ?
          <DraftCardList
            boosters={this.state.boosters}
            addCardToDeck={this.addCardToDeck}
            boosterIndex={this.state.boosterIndex}
          />
        :
          null
        }

        {this.state.showCard !== null
        ?
          <Card card={this.state.showCard} />
        :
          null
        }

        {this.state.mouseOver
        ?
          <div className="hoverImage">
            <img src={this.state.hoverImageUrl} alt="imageUrl" className="cardImage" />
          </div>
        :
          null
        }
      </div>
    );
  }
}

export default App;
