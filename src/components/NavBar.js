import React from 'react'

const NavBar = ({ getCardsWithColor, playDraft, showDraftDeck, sets, draftDeck }) => {

    return (
        <div className="navBarElements">
            <button onClick={getCardsWithColor('white')} className='btn btn-default buttonWhite'>White</button>
            <button onClick={getCardsWithColor('blue')} className='btn btn-default buttonBlue'>Blue</button>
            <button onClick={getCardsWithColor('black')} className='btn btn-default buttonBlack'>Black</button>
            <button onClick={getCardsWithColor('red')} className='btn btn-default buttonRed'>Red</button>
            <button onClick={getCardsWithColor('green')} className='btn btn-default buttonGreen'>Green</button>
            <select id="draft-select" className="form-control" onChange={playDraft}>
                <option defaultValue hidden>Draft</option>
                {sets.map(function(set, index) {
                    return(
                        <option value={set.code} key={index}>{set.name}</option>
                    )
                })}
            </select>
            {draftDeck.length > 0
            ?
                <button onClick={showDraftDeck} className="btn btn-default">Draft Deck ({draftDeck.length})</button>
            :
                null
            }
        </div>
    )
}

export default NavBar