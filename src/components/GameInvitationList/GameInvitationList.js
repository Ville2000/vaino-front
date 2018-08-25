import React from 'react'
import './GameInvitationList.css'

const GameInvitationList = ({
  invitations,
  acceptInvitation,
  denyInvitation,
  hideList
}) => {
  const invitationList = invitations.map(invitation =>
    <div className="game_invitations_list__invitation" key={invitation._id}>
      <p className="game_invitations_list__invitation__creator"><span>Pelaajalta</span>{ invitation.createdBy.username }</p>
      <button
        className="game_invitations_list__invitation__btn-accept btn btn--success"
        onClick={ acceptInvitation(invitation._id) }>Hyväksy</button>
      <button
        className="game_invitations_list__invitation__btn-deny btn btn--warning"
        onClick={ denyInvitation(invitation._id) }>Hylkää</button>
    </div>
  )


  return (
    <div className="game_invitations_list__wrapper">
      {
        invitations && invitations.length > 0 ?
        <div className="game_invitations_list">
          <div className="game_invitations_list__header">
            <h2>Sinulle on pelikutsuja</h2>
            <button onClick={ hideList }>Piilota</button>
          </div>
          { invitationList }
        </div> :
        null
      }
    </div>
  )
}

export default GameInvitationList