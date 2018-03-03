import React from 'react';
import decode from 'jwt-decode';
import AddChannelModal from '../components/AddChannelModal';
import Channels from '../components/Channels';
import Teams from '../components/Teams';

class Sidebar extends React.Component{
  state = {
    openAddChannelModal: false
  }

  handleCloseChannelModal= () => (
    this.setState({
      openAddChannelModal: false
    })
  )

  handleAddChannelClick = () => (
    this.setState({
      openAddChannelModal: true
    })
  )

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
        onAddChannelClick={this.handleAddChannelClick}
      />,
      <AddChannelModal
        teamId={team.id}
        onClose={this.handleCloseChannelModal}
        open={this.state.openAddChannelModal}
        key="sidebar-add-channel-modal"
      />
    ];
  }
}



export default Sidebar;