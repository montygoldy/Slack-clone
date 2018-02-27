import React from 'react';
import { Container, Header, Icon, Input, Button, Message, Form } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class Register extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: "",
      usernameError: "",
      email: "",
      emailError: "",
      password: "",
      passwordError:""
    };
  }

  onSubmit = async (e) => {

    // reset the ui field
    this.setState({
      usernameError: '',
      emailError: '',
      passwordError: ''
    })

    const { username, email, password } = this.state;
    const res = await this.props.mutate({
      variables: { username, email, password },
    });
    const { ok, errors } = res.data.register;
    if(ok){
      this.props.history.push('/');
    } else{
      const err = {};
      errors.forEach(({path, message}) => {
        err[`${path}Error`] = message;
      });
      this.setState(err);
    }
    console.log(res);
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  }

  render(){
    const { username, email, password, usernameError, emailError, passwordError } = this.state;
    return (
      <Container text>
        <Header as='h2'>Register</Header>
        <Form>
          <Form.Field error={!!usernameError} >
            <Input name="username" onChange={this.onChange} value={username} fluid iconPosition='left' placeholder='Username'>
              <Icon name='user' />
              <input />
            </Input>
          </Form.Field>
          <Form.Field error={!!emailError} >
            <Input name="email" onChange={this.onChange}  value={email} fluid iconPosition='left' placeholder='Email' type="email">
              <Icon name='at' />
              <input />
            </Input>
          </Form.Field>
          <Form.Field error={!!passwordError}>
            <Input name="password" onChange={this.onChange} value={password} fluid iconPosition='left' placeholder='Password' type="password">
              <Icon name='privacy' />
              <input />
            </Input>
          </Form.Field>
          <Button icon onClick={this.onSubmit}>
            <Icon name='signup' /> Register
          </Button>
        </Form>

        {
          (usernameError || emailError || passwordError) && (
            <Message
              error
              header='There was some errors with your submission'
              list={[usernameError, emailError, passwordError].filter(e => e)
              }
            />
          )
        }
      </Container>
    );
  }
}

const registerMutation = gql `
  mutation($username: String!, $email: String!, $password: String!){
    register(username: $username, email: $email, password: $password) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(registerMutation)(Register);

