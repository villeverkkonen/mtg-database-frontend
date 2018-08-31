import React from 'react'

const DraftCardList = ({ boosters, addCardToDeck }) => {
    return (
        <div className="draftCardList">
            {boosters[0].map(function(card, index) {
                return (
                    <img src={card.imageUrl} alt="imageUrl" key={index} className="draftCardImage" onClick={addCardToDeck(card, 0)} />
                )
            })}
        </div>
    )
}

export default DraftCardList