import React from 'react';
import Messages from '../components/Messages';
import gql from'graphql-tag';
import { graphql } from 'react-apollo';
import { Comment } from 'semantic-ui-react'

const newChannelMesageSubscription = gql`
  subscription($channelId: Int!){
    newChannelMessage(channelId: $channelId){
      id
      text
      user{
        username
      }
      created_at
    }
  }
`;

class MessageContainer extends React.Component {
  componentWillMount(){
    this.props.data.subscribeToMore({
      document: newChannelMesageSubscription,
      variables: {
        channelId: this.props.channelId
      },
      updateQuery: (prev, { subscriptionData }) => {
        if(!subscriptionData){
          return prev
        }
        return {
          ...prev,
          messages: [...prev.messages, subscriptionData.data.newChannelMessage]
        }
      }
    });
  }

  render(){
    const { data: { loading, messages } } = this.props;
    return (loading ? null : (
      <Messages>
        <Comment.Group>
          {messages.map( message => (
            <Comment key={`message-${message.id}`}>
              <Comment.Content>
                <Comment.Author as='a'>{message.user.username}</Comment.Author>
                <Comment.Metadata>
                  <div>{message.created_at}</div>
                </Comment.Metadata>
                <Comment.Text>{message.text}</Comment.Text>
                <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions>
              </Comment.Content>
            </Comment>
          ))}
        </Comment.Group>
      </Messages>
    ))};
  }

const messagesQuery = gql `
  query($channelId: Int!){
    messages(channelId: $channelId){
      id
      text
      user{
        username
      }
      created_at
    }
  }
`;

export default graphql(messagesQuery, {
  variables: props => ({
    channelId: props.channelId
  })
})(MessageContainer);