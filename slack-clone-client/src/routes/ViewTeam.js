import React from 'react';
import { graphql } from 'react-apollo';
import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
import Sidebar from '../containers/sidebar';
import { allTeamsQuery } from '../graphql/team';
import findIndex from 'lodash/findIndex';

const ViewTeam = ({ data: { loading, allTeams}, match: { params: { teamId, channelId } } }) => {

  if(loading){
    return null;
  }

  const teamIdx = !!teamId ? findIndex(allTeams, ['id', parseInt(teamId, 10)]) : 0;
  const team = allTeams[teamIdx];
  const channelIdx = !!channelId ? findIndex(team.channels, ['id', parseInt(channelId, 10)]) : 0;
  const channel = team.channels[channelIdx];
   return (
    <AppLayout>
      <Sidebar teams={allTeams.map(t => ({
          id: t.id,
          initial: t.name.charAt(0).toUpperCase(),
        }))}
        team={team} />
      <Header channelName="general" />
      <Messages>
        <ul className="message-list">
          <li />
          <li />
        </ul>
      </Messages>
      <SendMessage channelName={channel.name} />
    </AppLayout>
  );
}

export default graphql(allTeamsQuery)(ViewTeam);

