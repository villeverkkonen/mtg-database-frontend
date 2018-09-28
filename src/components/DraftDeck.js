import React from 'react'

const DraftDeck = ({ draftDeck, cardsLeft, getBackToDrafting }) => {

    draftDeck.sort(function(a, b) {
        let colorsA = ""
        if (a.colors) {
            for (let i = 0; i < a.colors.length; i++) {
                colorsA += a.colors[i]
            }
        }
        let colorsB = ""
        if (b.colors) {
            for (let i = 0; i < b.colors.length; i++) {
                colorsB += b.colors[i]
            }
        }
        if (colorsA < colorsB) return -1
        if (colorsA > colorsB) return 1
        return 0;
    })

    return (
        <div className="draftDeck">
        { cardsLeft
        ?
            <button onClick={getBackToDrafting} className="btn btn-default buttonDefaultBlackText">Back to drafting</button>
        :
            null
        }
        <h1 id="draftedDeckTitle">Drafted Deck</h1>
            {draftDeck.map(function(card, index) {
                return (
                    <img src={card.imageUrl} alt="imageUrl" key={index} className="draftDeckCardImage cardImage" />
                )
            })}
        </div>
    )
}

export default DraftDeck