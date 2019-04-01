import React from 'react'

const NavBar = ({ getCardsWithColor, playDraft, showDraftDeck, sets, draftDeck, savedDecksAmount, showSavedDecks }) => {

    return (
        <div className="navBarElements">
            <div className="upperBtnRow">
                <button onClick={getCardsWithColor('white')} className='btn btn-default buttonWhite'>White</button>
                <button onClick={getCardsWithColor('blue')} className='btn btn-default buttonBlue'>Blue</button>
                <button onClick={getCardsWithColor('black')} className='btn btn-default buttonBlack'>Black</button>
            </div>
            <div className="lowerBtnRow">
                <button onClick={getCardsWithColor('red')} className='btn btn-default buttonRed'>Red</button>
                <button onClick={getCardsWithColor('green')} className='btn btn-default buttonGreen'>Green</button>
            </div>
            <div className="draftSelectList">
                <select id="draft-select" className="form-control" onChange={playDraft}>
                    <option defaultValue hidden>Draft</option>
                    {sets.map(function(set, index) {
                        return(
                            <option value={set.code} key={index}>{set.name}</option>
                        )
                    })}
                </select>
            </div>

            <button onClick={showSavedDecks} className='btn buttonShowSavedDecks'>Saved Decks ({savedDecksAmount})</button>

            {draftDeck.length > 0
            ?
                <button onClick={showDraftDeck} className='btn buttonShowDraftedDeck'>Drafted Deck ({draftDeck.length})</button>
            :
                null
            }
        </div>
    )
}

export default NavBar