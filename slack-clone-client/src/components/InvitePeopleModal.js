import React from 'react'
import { Form, Input, Button, Modal } from 'semantic-ui-react'
import '../style.css';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';



const InvitePeopleModal = ({open, onClose, values, handleChange, handleBlur, handleSubmit, isSubmitting,}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add People to your Team</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input value={values.email} onChange={handleChange} onBlur={handleBlur} name="email" fluid placeholder="User's email"/>
        </Form.Field>
        <Form.Group widths="equal" >
          <Button fluid disabled={isSubmitting} onClick={handleSubmit} >Add User</Button>
          <Button fluid disabled={isSubmitting} onClick={onClose} >Cancel</Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
)

const addTeamMemberMutation = gql`
  mutation($email: String!, $teamId: Int!){
    addTeamMember(email: $email, teamId: $teamId){
      ok
      errors{
        path
        message
      }
    }
  }
`;

export default compose(
  graphql(addTeamMemberMutation),
  withFormik({
    mapPropsToValues: props => ({ email: '' }),

    handleSubmit: async (values, { props: { onClose, teamId, mutate }, setSubmitting, setErrors }) => {
      const response = await mutate({
        variables: { teamId, email: values.email }
      })

      const { ok, errors } = response.data.addTeamMember;
      if(ok){
        onClose();
        setSubmitting(false);
      }else{

      }
    },
  })
)(InvitePeopleModal);

