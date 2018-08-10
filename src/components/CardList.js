import React from 'react'

const CardList = ({ cards, showCard }) => {
    console.log(cards)
  return (
    <ul>
        {
            cards.map(function(card, index) {
                return <li key={index} onClick={showCard(card.id)}>{card.name}</li>
            })
        }
    </ul>
  )
}

export default CardList