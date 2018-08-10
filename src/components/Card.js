import React from 'react'

const Card = ({ index, cardName }) => {
  return (
    <li key={index}>{cardName}</li>
  )
}

export default Card