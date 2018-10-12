import React from 'react'

const SavedDecksList = ({ savedDecks, showSavedDeckById }) => {
    return (
        <div className="savedDecksList">
            <ul className="savedDecksListUl list-group">

                {savedDecks.sort((a, b) => a.created_at > b.created_at).map(function(deck) {
                    return (
                        <li
                            onClick={showSavedDeckById(deck.id)}
                            key={deck.id}
                            className="savedDecksListLi list-group-item"
                        >
                            {deck.name}
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default SavedDecksList