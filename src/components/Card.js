import React from 'react'

const Card = ({ card }) => {
  return (
    <div className="showCard">
        <p>{card.name}</p>
        <img src={card.imageUrl} alt="cardImage" />
    </div>
  )
}

export default Card