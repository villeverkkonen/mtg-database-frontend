import React from 'react'

const DraftCardList = ({ draftCards }) => {
    return (
        <div className="draftCardList">
            {draftCards.map(function(card, index) {
                return (
                    <img src={card.imageUrl} alt="imageUrl" key={index} className="draftCardImage" />
                )
            })}
        </div>
    )
}

export default DraftCardList