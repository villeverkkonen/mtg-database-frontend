import React from 'react'

const DraftDeck = ({ draftDeck, cardsLeft, getBackToDrafting, saveDeck, deckIsSaved, toggleShowSaveDeckForm, showSavedDeckForm, changeSavedDeckName, savedDeckName, showDeckHasBeenSavedText }) => {

    draftDeck.sort(function(a, b) {
        let colorsA = ""
        if (a.colors) {
            for (let i = 0; i < a.colors.length; i++) {
                colorsA += a.colors[i]
            }
            colorsA += a.cmc
        }
        let colorsB = ""
        if (b.colors) {
            for (let i = 0; i < b.colors.length; i++) {
                colorsB += b.colors[i]
            }
            colorsB += b.cmc
        }
        if (colorsA < colorsB) return -1
        if (colorsA > colorsB) return 1
        return 0;
    })

    return (
        <div className="draftDeck">
        <div className="savedDeckNameDiv">
            {showDeckHasBeenSavedText
            ?
                <p className="goldenParagraph">Deck {savedDeckName} has been saved!</p>
            :
                null
            }
        </div>

        {cardsLeft
        ?
            <button onClick={getBackToDrafting} className="btn btn-default buttonDefaultPurpleText">Back to drafting</button>
        :
            <div className="saveDeckDiv">
                {!deckIsSaved
                ?
                    <button onClick={toggleShowSaveDeckForm} className="btn btn-default buttonDefaultPurpleText">Save Deck</button>
                :
                    null
                }
                
                {showSavedDeckForm
                ?
                    <div className="saveDeckForm">
                        <input onChange={changeSavedDeckName} placeholder="Deck Name" type="text" id="changeSavedDeckNameInput" autoFocus></input>
                        <button onClick={saveDeck(draftDeck, savedDeckName)} className="btn btn-default saveDeckButton buttonDefaultBlackText">Save</button>
                    </div>
                :
                    null
                }
            </div>
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