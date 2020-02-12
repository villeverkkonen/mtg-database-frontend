import React from 'react'

const SavedDeck = ({ savedDeck }) => {
  return (
    <div className="draftDeck">
      <h1 className="savedDeckName">{savedDeck.name}</h1>

      {savedDeck.cards.map(function(card, index) {
        return (
          <img
            src={card.imageUrl}
            alt={card.name}
            key={index}
            className="savedDeckCardImage cardImage"
          />
        )
      })}
    </div>
  )
}

export default SavedDeck
