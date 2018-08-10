import React from 'react'

const CardList = ({ cards, showCard, mouseOver, mouseOut }) => {

  return (
    <ul className="cardListUl">
        {
            cards.map(function(card, index) {
                return(
                    <li
                        key={index}
                        onClick={showCard(card.id)}
                        onMouseOver={mouseOver(card.imageUrl)}
                        onMouseOut={mouseOut}
                        className="cardListLi"
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