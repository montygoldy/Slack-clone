import React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Container, Header, Icon, Input, Button, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class Login extends React.Component{
  constructor(props){
    super(props);

    extendObservable(this, {
      email: '',
      password: '',
    });
  }

  onSubmit = async () => {
    const { email, password } = this;
    const res = await this.props.mutate({
      variables: { email, password }
    });

    console.log(res);
    const { ok, refreshToken, token } = res.data.login;
    if(ok){
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
    }
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
  }

  render(){
    const { email, password } = this;
    return (
      <Container text>
        <Form>
          <Header as='h2'>Login</Header>
          <Form.Field>
            <Input name="email" onChange={this.onChange}  value={email} fluid iconPosition='left' placeholder='Email' type="email">
              <Icon name='at' />
              <input />
            </Input>
          </Form.Field>
          <Form.Field>
            <Input name="password" onChange={this.onChange} value={password} fluid iconPosition='left' placeholder='Password' type="password">
              <Icon name='privacy' />
              <input />
            </Input>
          </Form.Field>
          <Button icon onClick={this.onSubmit}>
            <Icon name='sign in' /> Sign In
          </Button>
        </Form>
      </Container>
    )
  }
};

const loginMutation = gql`
  mutation($email: String!, $password: String!){
    login(email: $email, password: $password){
      ok
      token
      refreshToken
      errors{
        path
        message
      }
    }
  }
`;

export default graphql(loginMutation)(observer(Login));


