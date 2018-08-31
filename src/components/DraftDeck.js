import React from 'react'

const DraftDeck = ({ draftDeck }) => {
    return (
        <div className="draftDeck">
            {draftDeck.map(function(card, index) {
                return (
                    <img src={card.imageUrl} alt="imageUrl" key={index} className="draftDeckCardImage cardImage" />
                )
            })}
        </div>
    )
}

export default DraftDeck