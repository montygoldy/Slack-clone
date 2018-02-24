import React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Container, Header, Icon, Input, Button } from 'semantic-ui-react';

class Login extends React.Component{
  constructor(props){
    super(props);

    extendObservable(this, {
      email: '',
      password: '',
    });
  }

  onSubmit = () => {
    const { email, password } = this;
    console.log(email, password);
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
  }

  render(){
    const { email, password } = this;
    return (
      <Container text>
        <Header as='h2'>Login</Header>
        <Input name="email" onChange={this.onChange}  value={email} fluid iconPosition='left' placeholder='Email' type="email">
          <Icon name='at' />
          <input />
        </Input>
        <Input name="password" onChange={this.onChange} value={password} fluid iconPosition='left' placeholder='Password' type="password">
          <Icon name='privacy' />
          <input />
        </Input>
        <Button icon onClick={this.onSubmit}>
          <Icon name='sign in' />
          Log In
        </Button>
      </Container>
    )
  }
};

export default observer(Login);


