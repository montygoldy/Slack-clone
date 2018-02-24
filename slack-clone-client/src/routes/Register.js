import React from 'react';
import { Container, Header, Icon, Input, Button } from 'semantic-ui-react'

class Register extends React.Component{
  state = {
    username: "",
    email: "",
    password: "",
  };

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  }

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

export default Register;