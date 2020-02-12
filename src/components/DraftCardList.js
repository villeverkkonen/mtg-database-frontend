import React from 'react'

const DraftCardList = ({
  boosters,
  addCardToDeck,
  boosterIndex,
  showDraftingInfo,
  toggleDraftingInfo
}) => {
  return (
    <div className="draftCardList">
      <div className="draftingInfo">
        <button
          onClick={toggleDraftingInfo}
          className="btn btn-default buttonDraftingInfo"
        >
          Info
        </button>

        {showDraftingInfo ? (
          <div className="draftingInfoText">
            <p>
              You and 7 computer players each have 3 boosters, each containing
              15 cards.
            </p>
            <p>
              Everybody opens the first booster and picks one card (computers by
              random).
            </p>
            <p>
              After picking a card, you pass your booster with 14 cards and get
              a 14 card booster from other player and so on...
            </p>
            <p>
              When all 15 cards are picked, each player opens a new booster and
              repeat the previous process.
            </p>
            <p>
              After drafting all 3 boosters you should have a 45 card deck which
              you can save to the database.
            </p>
          </div>
        ) : null}
      </div>

      {boosters[boosterIndex].map(function(card, index) {
        return (
          <img
            src={card.imageUrl}
            alt="imageUrl"
            key={index}
            className="draftCardImage cardImage"
            onClick={addCardToDeck(card, boosterIndex, index)}
          />
        )
      })}
    </div>
  )
}

export default DraftCardList
