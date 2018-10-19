import React, { Component } from 'react'
import cardService from './services/cards'
import deckService from './services/decks'
import Card from './components/Card'
import CardList from './components/CardList'
import NavBar from './components/NavBar'
import DraftCardList from './components/DraftCardList'
import DraftDeck from './components/DraftDeck'
import SavedDeck from './components/SavedDeck'
import SavedDecksList from './components/SavedDecksList'

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
    this.showDraftDeck = this.showDraftDeck.bind(this)
    this.showDraftDeckWithoutEvent = this.showDraftDeckWithoutEvent.bind(this)
    this.toggleDraftingInfo = this.toggleDraftingInfo.bind(this)
    this.getBackToDrafting = this.getBackToDrafting.bind(this)
    this.showSavedDecks = this.showSavedDecks.bind(this)
    this.showSavedDeckById = this.showSavedDeckById.bind(this)
    this.saveDeck = this.saveDeck.bind(this)
    this.toggleShowSaveDeckForm = this.toggleShowSaveDeckForm.bind(this)
    this.changeSavedDeckName = this.changeSavedDeckName.bind(this)

    // Check if using mobile with touch
    const touchsupport = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)
    this.state = {
      cards: [],
      boosters: [],
      draftDeck: [],
      savedDecks: [],
      sets: [],
      mouseOver: false,
      showDraftDeck: false,
      showSavedDecks: false,
      loadingDraft: false,
      showDraftingInfo: false,
      showCard: null,
      showSavedDeckForm: false,
      showDeckHasBeenSavedText: false,
      savedDeckToShow: null,
      savedDeckName: null,
      deckIsSaved: false,
      cardsLeft: false,
      draftSet: '',
      hoverImageUrl: '',
      cardListColor: '',
      showLinkForId: '',
      boosterIndex: 0,
      draftRound: 0,
      savedDecksAmount: 0,
      touchsupport: touchsupport
    }
  }

  async componentDidMount() {
    let setsArray = []
    await cardService
      .getSets()
      .then(response => {
        response.sets.map(function(set) {
          return(
            set.booster
            ?
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

    await deckService
      .getAll()
      .then(savedDecks => {
        this.setState({
          savedDecks: savedDecks,
          savedDecksAmount: savedDecks.length
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
          showCard: null,
          mouseOver: false,
          showDraftDeck: false,
          showSavedDecks: false,
          showSavedDeckForm: false,
          hoverImageUrl: '',
          cardListColor: color,
          showLinkForId: '',
          savedDeckToShow: null,
        })
      })
  }

  // Get 8 boosters with 15 draft cards each for given set
  playDraft = (event) => {
    event.preventDefault()

    const draftSet = document.getElementById('draft-select').value

    // Show loading text while getting the boosters from API
    this.setState({
      loadingDraft: true,
      deckIsSaved: false,
      boosters: [],
      draftSet: draftSet
    })

    // Change value back to default
    document.getElementById("draft-select").value = "Draft"

    // Get 8 boosters
    for (let i = 0; i < 8; i++) {
      cardService
      .getBooster(draftSet)
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
      draftDeck: [],
      showCard: null,
      mouseOver: false,
      showDraftDeck: false,
      showSavedDecks: false,
      showSavedDeckForm: false,
      showDraftingInfo: false,
      cardsLeft: true,
      hoverImageUrl: '',
      cardListColor: '',
      showLinkForId: '',
      boosterIndex: 0,
      draftRound: 1,
      savedDeckToShow: null
    })
  }

  shuffleNewBoosters = (draftRound) => {
    // Show loading text while getting the boosters from API
    this.setState({
      loadingDraft: true,
      boosters: [],
      showDraftingInfo: false
    })

    // Get 8 boosters
    for (let i = 0; i < 8; i++) {
      cardService
      .getBooster(this.state.draftSet)
      .then(response => {
        const booster = [response.cards]
        this.setState({
          boosters: this.state.boosters.concat(booster),
          cardsLeft: true,
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
          mouseOver: false,
          showDraftDeck: false,
          showCard: null,
          cardListColor: '',
          showLinkForId: ''
        })
      // If first click, show the hover image
      } else {
        this.setState({
          mouseOver: true,
          showDraftDeck: false,
          showSavedDecks: false,
          hoverImageUrl: imageUrl,
          showCard: null,
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
          cards: [],
          showCard: response.card,
          mouseOver: false,
          showDraftDeck: false,
          showSavedDecks: false,
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
          showCard: response.card,
          mouseOver: false,
          showDraftDeck: false,
          showSavedDecks: false,
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

  addCardToDeck = (card, boosterIndex, cardIndex) => (event) => {
    event.preventDefault()

    let boosterIndexIncrement = this.state.boosterIndex
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

    this.setState({
      draftDeck: this.state.draftDeck.concat(card),
      boosters: boosters,
      boosterIndex: boosterIndexIncrement,
      showDraftingInfo: false
    })

    if (this.state.boosters[0].length === 0 && this.state.draftRound < 3) {
      this.setState({
        boosterIndex: 0,
        cardsLeft: false
      })
      this.shuffleNewBoosters(this.state.draftRound + 1)
    } else if (this.state.boosters[0].length === 0 && this.state.draftRound === 3) {
      this.showDraftDeckWithoutEvent()
    }
  }

  // Button to show drafted cards
  showDraftDeck = (event) => {
    event.preventDefault()

    this.setState({
      cards: [],
      showCard: null,
      mouseOver: false,
      showDraftDeck: true,
      showSavedDeckForm: false,
      hoverImageUrl: '',
      showLinkForId: '',
      cardListColor: '',
      showSavedDecks: false,
      savedDeckToShow: null
    })
  }

  // Cannot call upper function from this file, needs event to work
  showDraftDeckWithoutEvent = () => {
    this.setState({
      cards: [],
      showCard: null,
      mouseOver: false,
      showDraftDeck: true,
      showSavedDeckForm: false,
      hoverImageUrl: '',
      showLinkForId: '',
      cardListColor: '',
      showSavedDecks: false,
      cardsLeft: false
    })
  }

  // Button to get back to drafting from viewing your so far drafted deck
  getBackToDrafting = (event) => {
    event.preventDefault()

    this.setState({
      showDraftDeck: false,
      showSavedDeckForm: false
    })
  }

  toggleDraftingInfo = (event) => {
    event.preventDefault()

    this.state.showDraftingInfo
    ?
      this.setState({ showDraftingInfo: false })
    :
      this.setState({ showDraftingInfo: true })
  }

  // Show drafted decks that were saved to database
  showSavedDecks = (event) => {
    event.preventDefault()

    this.setState({
      showSavedDecks: true,
      cards: [],
      mouseOver: false,
      showDraftDeck: false,
      showSavedDeckForm: false,
      loadingDraft: false,
      showDraftingInfo: false,
      showCard: null,
      hoverImageUrl: '',
      cardListColor: '',
      showLinkForId: '',
      savedDeckToShow: null
    })
  }

  // Show selected saved deck
  showSavedDeckById = (deckId) => (event) => {
    event.preventDefault()

    deckService
      .getById(deckId)
      .then(savedDeckToShow => {
        this.setState({
          showSavedDecks: false,
          showSavedDeckForm: false,
          savedDeckToShow: savedDeckToShow
        })
      })
  }

  // Save complete deck to database
  saveDeck = (deckCards, deckName) => async (event) => {
    event.preventDefault()

    if (!deckName) {
      alert("Name your deck!")
    } else {

      const newDeck = {"name":deckName, "cards":deckCards}

      await deckService
        .create(newDeck)
        .then(deck => {
          this.setState({
            deckIsSaved: true,
            savedDeckName: deck.name,
            showSavedDeckForm: false,
            showDeckHasBeenSavedText: true
          })
        })
        setTimeout(() => {
          this.setState({
            savedDeckName: null,
            showDeckHasBeenSavedText: false
          })
        }, 3000)

      // Get the saved decks from database
      // If there are more than 10 saved decks, backend automatically deletes the oldest ones
      await deckService
        .getAll()
        .then(foundDecks => {
          this.setState({
            savedDecks: foundDecks,
            savedDecksAmount: foundDecks.length
          })
        })
    }
  }

  toggleShowSaveDeckForm = (event) => {
    event.preventDefault()

    if (this.state.showSavedDeckForm === false) {
      this.setState({
        showSavedDeckForm: true
      })
    } else {
      this.setState({
        showSavedDeckForm: false
      })
    }
  }

  changeSavedDeckName = (event) => {
    event.preventDefault()

    this.setState({
      savedDeckName: event.target.value
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
          savedDecksAmount={this.state.savedDecks.length}
          showSavedDecks={this.showSavedDecks}
        />

        {this.state.savedDeckToShow !== null
        ?
          <SavedDeck
            savedDeck={this.state.savedDeckToShow}
          />
        :
          null
        }

        {this.state.showSavedDecks
        ?
          <SavedDecksList
            savedDecks={this.state.savedDecks}
            showSavedDeckById={this.showSavedDeckById}
          />
        :
          null
        }

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
          <DraftDeck
            draftDeck={this.state.draftDeck}
            cardsLeft={this.state.cardsLeft}
            getBackToDrafting={this.getBackToDrafting}
            saveDeck={this.saveDeck}
            deckIsSaved={this.state.deckIsSaved}
            toggleShowSaveDeckForm={this.toggleShowSaveDeckForm}
            showSavedDeckForm={this.state.showSavedDeckForm}
            changeSavedDeckName={this.changeSavedDeckName}
            savedDeckName={this.state.savedDeckName}
            showDeckHasBeenSavedText={this.state.showDeckHasBeenSavedText}
          />
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

        {this.state.boosters.length > 0 && !this.state.showDraftDeck && !this.state.showSavedDecks &&
        !this.state.savedDeckToShow && this.state.cards.length === 0 && !this.state.showCard
        ?
          <DraftCardList
            boosters={this.state.boosters}
            addCardToDeck={this.addCardToDeck}
            boosterIndex={this.state.boosterIndex}
            showDraftingInfo={this.state.showDraftingInfo}
            toggleDraftingInfo={this.toggleDraftingInfo}
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
