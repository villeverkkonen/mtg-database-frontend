import React from 'react'

const DraftCardList = ({ draftCards, addCardToDeck }) => {
    return (
        <div className="draftCardList">
            {draftCards.map(function(card, index) {
                return (
                    <img src={card.imageUrl} alt="imageUrl" key={index} className="draftCardImage" onClick={addCardToDeck(card)} />
                )
            })}
        </div>
    )
}

export default DraftCardList