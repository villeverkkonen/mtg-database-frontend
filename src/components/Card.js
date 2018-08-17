import React from 'react'

const Card = ({ card }) => {
  return (
    <div className="showCard">
        <img src={card.imageUrl} alt="imageUrl" />

        <div className="row">
          <div className="col-sm-4 title-cell cardLeftColumn">
            Name:
          </div>
          <div className="col-sm-8 data-cell cardRightColumn">
            {card.name}
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4 title-cell cardLeftColumn">
            Set:
          </div>
          <div className="col-sm-8 data-cell cardRightColumn">
            {card.setName}
          </div>
        </div>

        <div className="row">
          <div className="col-sm-4 title-cell cardLeftColumn">
            Rarity:
          </div>
          <div className="col-sm-8 data-cell cardRightColumn">
            {card.rarity}
          </div>
        </div>

        <div className="row cardText">
          <div className="col-sm-12 title-cell">
            {card.text}
          </div>
        </div>
    </div>
  )
}

export default Card