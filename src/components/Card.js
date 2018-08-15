import React from 'react'

const Card = ({ card }) => {
  return (
    <div className="showCard">
        <img src={card.imageUrl} alt="imageUrl" />
        <ul className="list-group">
          <li className="list-group-item">Name: {card.name}</li>
          <li className="list-group-item">Mana cost: {card.manaCost}</li>
          <li className="list-group-item">Set: {card.setName}</li>
          <li className="list-group-item">Rarity: {card.rarity}</li>
        </ul>
    </div>
  )
}

export default Card