import React from 'react';
import Messages from '../components/Messages';
import gql from'graphql-tag';
import { graphql } from 'react-apollo';

const MessageContainer = ({ channelId }) => (
  <Messages>
    <ul className="message-list">
      <li />
      <li />
    </ul>
  </Messages>
);

const messageQuery = gql `
  query($channelId: Int!){
    messages(channelId: $channelId){
      id
      text
      user{
        username
      }
      createdAt
    }
  }
`;

export default graphql(messageQuery)(MessageContainer);