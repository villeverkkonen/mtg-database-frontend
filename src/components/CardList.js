import React from 'react'

const CardList = ({ cards, showCardForMobile, showImageOrCard, mouseOver, mouseOut, color, showLinkForId }) => {

  return (
    <div className="cardList">
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
                                <button onClick={showCardForMobile(card.id)} className="btn showLinkForIdButton">Show</button>
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
    </div>
  )
}

export default CardList