import React from 'react';
import { extendObservable } from 'mobx';
import { observer } from 'mobx-react';
import { Container, Header, Icon, Input, Button, Form, Message } from 'semantic-ui-react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class CreateTeam extends React.Component{
  constructor(props){
    super(props);

    extendObservable(this, {
      email: '',
      errors: {}
    });
  }

  onSubmit = async () => {
    const { name } = this;
    const res = await this.props.mutate({
      variables: { name }
    });

    const { ok, errors } = res.data.createTeam;

    if(ok){
      this.props.history.push('/');
    } else{
      const err = {};
      errors.forEach(({path, message}) => {
        err[`${path}Error`] = message;
      });
      this.errors = err;
    }

    console.log(res);
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this[name] = value;
  }

  render(){
    const { name, errors: { nameError} } = this;
    return (
      <Container text>
        <Form>
          <Header as='h2'>Create Team</Header>
          <Form.Field error={!!nameError}>
            <Input name="name" onChange={this.onChange}  value={name} fluid iconPosition='left' placeholder='Team Name' type="text">
              <Icon name='users' />
              <input />
            </Input>
          </Form.Field>
          <Button icon onClick={this.onSubmit}>
            <Icon name='add user' /> Create Team
          </Button>
        </Form>
        {
          nameError && (
            <Message
              error
              header='There was some errors with your submission'
              list={[nameError]}
            />
          )
        }
      </Container>
    )
  }
};

const createTeamMutation = gql`
  mutation($name: String!) {
    createTeam(name: $name) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export default graphql(createTeamMutation)(observer(CreateTeam));


