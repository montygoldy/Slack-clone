import React from 'react';
import Channels from '../components/Channels';
import Teams from '../components/Teams';
import Header from '../components/Header';
import Messages from '../components/Messages';
import SendMessage from '../components/SendMessage';
import AppLayout from '../components/AppLayout';

export default () => (
  <AppLayout>
    <Teams teams={[{id: 1, initial: "T"}, {id: 2, initial: "B" }]} />
    <Channels
      teamName="Team Name"
      username="Username"
      channels={[{id: 1, name: "General"}, {id:2, name: "Reandom"}]}
      users={[{id: 1, name: "slackbot"}, {id: 2, name: "User 1"}]}
    />
    <Header channelName="general" />
    <Messages>
      <ul className="message-list">
        <li></li>
        <li></li>
      </ul>
    </Messages>
    <SendMessage channelName="announcement"  />

  </AppLayout>
)