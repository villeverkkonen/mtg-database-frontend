import React from 'react'

const DraftCardList = ({ boosters, addCardToDeck, boosterIndex }) => {
    return (
        <div className="draftCardList">
            {boosters[boosterIndex].map(function(card, index) {
                return (
                    <img src={card.imageUrl} alt="imageUrl" key={index} className="draftCardImage cardImage" onClick={addCardToDeck(card, boosterIndex, index)} />
                )
            })}
        </div>
    )
}

export default DraftCardList