import React from 'react';
import decode from 'jwt-decode';
import AddChannelModal from '../components/AddChannelModal';
import Channels from '../components/Channels';
import Teams from '../components/Teams';
import InvitePeopleModal from '../components/InvitePeopleModal';

class Sidebar extends React.Component{
  state = {
    openAddChannelModal: false,
    openInvitePeopleModal: false
  }

  toggleAddChannelModal = (e) => {
    if(e){
      e.preventDefault();
    }
    this.setState(
      state => ({openAddChannelModal: !state.openAddChannelModal})
    )
  }


  toggleInvitePeopleModal = (e) => {
    if(e){
      e.preventDefault();
    }
    this.setState(
      state => ({ openInvitePeopleModal: !state.openInvitePeopleModal })
    )
  }


  render(){
    const { teams, team} = this.props

    let username = '';
    try {
      const token = localStorage.getItem('token');
      const { user } = decode(token);
      // eslint-disable-next-line prefer-destructuring
      username = user.username;
    } catch (err) {}

    return [
      <Teams
        key="team-sidebar"
        teams={teams}
      />,
      <Channels
        key="channels-sidebar"
        teamName={team.name}
        username={username}
        teamId={team.id}
        channels={team.channels}
        users={[{ id: 1, name: 'slackbot' }, { id: 2, name: 'user1' }]}
        onAddChannelClick={this.toggleAddChannelModal}
        onInvitePeopleClick={this.toggleInvitePeopleModal}
      />,
      <AddChannelModal
        teamId={team.id}
        onClose={this.toggleAddChannelModal}
        open={this.state.openAddChannelModal}
        key="sidebar-add-channel-modal"
      />,
      <InvitePeopleModal
        teamId={team.id}
        onClose={this.toggleInvitePeopleModal}
        open={this.state.openInvitePeopleModal}
        key="invite-people-modal"
      />
    ];
  }
}



export default Sidebar;