import React from 'react';
import { graphql } from 'react-apollo';
import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';
import Sidebar from '../containers/sidebar';
import { allTeamsQuery } from '../graphql/team';
import findIndex from 'lodash/findIndex';
import { Redirect } from 'react-router-dom';

const ViewTeam = ({ data: { loading, allTeams}, match: { params: { teamId, channelId } } }) => {

  if(loading){
    return null;
  }

  if(!allTeams.length){
    return (<Redirect to="/create-team" />);
  }

  let teamIdInteger = parseInt(teamId, 10);
  const teamIdx = teamIdInteger ? findIndex(allTeams, ['id', teamIdInteger]) : 0;
  const team = allTeams[teamIdx];

  let channelIdInteger = parseInt(channelId, 10);
  const channelIdx = channelIdInteger ? findIndex(team.channels, ['id', channelIdInteger]) : 0;
  const channel = team.channels[channelIdx];
   return (
    <AppLayout>
      <Sidebar teams={allTeams.map(t => ({
          id: t.id,
          initial: t.name.charAt(0).toUpperCase(),
        }))}
        team={team} />
      <Header channelName={channel.name} />
      <Messages channelId={channel.id} >
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

