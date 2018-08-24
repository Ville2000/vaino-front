import React from 'react'
import Friend from '../Friend/Friend'
import './FriendList.css'

const FriendList = ({ friends, deleteFriend, loadingFriends }) => {
  return (
    <div className="friend-list__wrapper">
    { loadingFriends ? 
      <div className="friend-list__wrapper__loading">Haetaan ystäviä...</div> :
      <div className="friend-list__content">
      { friends && friends.length > 0 ?
        friends.map(friend =>
          <Friend
            key={ friend._id }
            id={ friend._id }
            username={ friend.username }
            deleteFriend={ deleteFriend }
          />) :
        <div className="friend-list__container_no-friends"><i>Ei kavereita Listalla</i></div>
      }
      </div>
    }
    </div>
  )
}

export default FriendList