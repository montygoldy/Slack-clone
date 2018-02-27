import React from 'react';
import Channels from '../components/Channels';
import Teams from '../components/Teams';
import Header from '../components/Header';
import Messages from '../components/Messages';
import Input from '../components/Input';
import AppLayout from '../components/AppLayout';

export default () => (
  <AppLayout>
    <Teams>Teams</Teams>
    <Channels
      teamName="Team Name"
      username="Username"
      channels={[{id: 1, name: "General"}, {id:2, name: "Reandom"}]}
      users={[{id: 1, name: "slackbot"}, {id: 2, name: "User 1"}]}
    />
    <Header>Header</Header>
    <Messages>
      <ul className="message-list">
        <li></li>
        <li></li>
      </ul>
    </Messages>
    <Input>
      <input type="text" placeholder="CSS Grid Layout Module" />
    </Input>
  </AppLayout>
)