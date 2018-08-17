import React from 'react'

const CardList = ({ cards, showCardForMobile, showImageOrCard, mouseOver, mouseOut, color, showLinkForId }) => {

  return (
    <ul className="cardListUl list-group">
        {
            cards.map(function(card, index) {
                if (card.id === showLinkForId) {
                    return(
                        <li
                            key={index}
                            onClick={showImageOrCard(card.id, card.imageUrl)}
                            onMouseOver={mouseOver(card.imageUrl)}
                            onMouseOut={mouseOut}
                            className="cardListLi list-group-item list-group-item-action list-group-item-warning"
                            style={{color: color}}
                        >
                            {card.name}
                            <br />
                            <span onClick={showCardForMobile(card.id)} className="showLinkForIdSpan">Show</span>
                        </li>
                    )
                } else {
                    return(
                        <li
                            key={index}
                            onClick={showImageOrCard(card.id, card.imageUrl)}
                            onMouseOver={mouseOver(card.imageUrl)}
                            onMouseOut={mouseOut}
                            className="cardListLi list-group-item list-group-item-action list-group-item-warning"
                            style={{color: color}}
                        >
                            {card.name}
                        </li>
                    )
                }
                
            })
        }
    </ul>
  )
}

export default CardList