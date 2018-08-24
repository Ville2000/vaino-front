import React from 'react'
import Friend from '../Friend/Friend'
import './FriendList.css'

const FriendList = ({ friends, deleteFriend }) => {
  return (
    <div className="friend-list__wrapper">
      <div className="friend-list__content">
        { friends.map(friend =>
          <Friend
            key={ friend._id }
            id={ friend._id }
            username={ friend.username }
            deleteFriend={ deleteFriend }
          />)}
      </div>
    </div>
  )
}

export default FriendList