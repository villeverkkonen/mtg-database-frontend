import React from 'react'

const SavedDecksList = ({ savedDecks, showSavedDeckById }) => {

    savedDecks.sort(function(a, b) {
        if (a.created_at > b.created_at) return -1
        if (a.created_at < b.created_at) return 1
        return 0;
    })

    return (
        <div className="savedDecksList">
            <ul className="savedDecksListUl list-group">

                {savedDecks.map(function(deck) {
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