import React from 'react'
import './Friend.css'

const Friend = ({ id, username, deleteFriend }) => {
  return (
    <div className="friend__content">
      <div className="friend__content__username">{ username }</div>
      <button className="friend__content__add-friend-btn" onClick={deleteFriend(id)}>x</button>
    </div>
  )
}

export default Friend