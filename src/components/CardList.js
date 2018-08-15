import React from 'react'

const CardList = ({ cards, showCard, mouseOver, mouseOut, color }) => {

  return (
    <ul className="cardListUl list-group">
        {
            cards.map(function(card, index) {
                return(
                    <li
                        key={index}
                        onClick={showCard(card.id)}
                        onMouseOver={mouseOver(card.imageUrl)}
                        onMouseOut={mouseOut}
                        className="cardListLi list-group-item list-group-item-action list-group-item-warning"
                        style={{color: color}}
                    >
                        {card.name}
                    </li>
                )
            })
        }
    </ul>
  )
}

export default CardList