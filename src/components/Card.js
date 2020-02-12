import React from 'react'

const Card = ({ card, backToCardList }) => {
  return (
    <div className="showCard">
      <div>
        <button
          onClick={backToCardList}
          className="btn buttonDefaultPurpleText"
        >
          Back
        </button>
      </div>

      <img src={card.imageUrl} alt="card_image" />

      <div className="row showCardRow">
        <div className="col-sm-4 title-cell showCardLeftColumn">Name:</div>
        <div className="col-sm-8 data-cell showCardRightColumn">
          {card.name}
        </div>
      </div>

      <div className="row showCardRow">
        <div className="col-sm-4 title-cell showCardLeftColumn">Set:</div>
        <div className="col-sm-8 data-cell showCardRightColumn">
          {card.setName}
        </div>
      </div>

      <div className="row showCardRow">
        <div className="col-sm-4 title-cell showCardLeftColumn">Rarity:</div>
        <div className="col-sm-8 data-cell showCardRightColumn">
          {card.rarity}
        </div>
      </div>

      <div className="row cardText">
        <div className="col-sm-12 title-cell">{card.text}</div>
      </div>
    </div>
  )
}

export default Card
