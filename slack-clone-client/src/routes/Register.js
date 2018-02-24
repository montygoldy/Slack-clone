import React from 'react';
import { Container, Header, Icon, Input, Button } from 'semantic-ui-react'
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class Register extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: "",
      email: "",
      password: "",
    };
  }

  onSubmit = async (e) => {
    const res = await this.props.mutate({
      variables: this.state,
    });

    console.log(res);
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render(){
    const { username, email, password } = this.state;
    return (
      <Container text>
        <Header as='h2'>Register</Header>
        <Input name="username" onChange={this.onChange} value={username} fluid iconPosition='left' placeholder='Username'>
          <Icon name='user' />
          <input />
        </Input>
        <Input name="email" onChange={this.onChange}  value={email} fluid iconPosition='left' placeholder='Email' type="email">
          <Icon name='at' />
          <input />
        </Input>
        <Input name="password" onChange={this.onChange} value={password} fluid iconPosition='left' placeholder='Password' type="password">
          <Icon name='privacy' />
          <input />
        </Input>
        <Button icon onClick={this.onSubmit}>
          <Icon name='signup' />
          Register
        </Button>
      </Container>
    );
  }
}

const registerMutation = gql `
  mutation($username: String!, $email: String!, $password: String!){
    register(username: $username, email: $email, password: $password)
  }
`;

export default graphql(registerMutation)(Register);

