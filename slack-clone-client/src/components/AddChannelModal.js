import React from 'react'
import { Form, Input, Button, Modal } from 'semantic-ui-react'
import '../style.css';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';
import { allTeamsQuery } from '../graphql/team';

const AddChannelModal = ({open, onClose, values, handleChange, handleBlur, handleSubmit, isSubmitting,}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add Channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input value={values.name} onChange={handleChange} onBlur={handleBlur} name="name" fluid placeholder="Channel Name"/>
        </Form.Field>
        <Form.Group widths="equal" >
          <Button fluid disabled={isSubmitting} onClick={handleSubmit} >Create Channel</Button>
          <Button fluid disabled={isSubmitting} onClick={onClose} >Cancel</Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
)

const createChannelMutation = gql`
  mutation($teamId: Int!, $name: String!){
    createChannel(teamId: $teamId, name: $name)
  }
`;

export default compose(
  graphql(createChannelMutation),
  withFormik({
    mapPropsToValues: props => ({ name: '' }),

    handleSubmit: async (values, { props: { onClose, teamId, mutate }, setSubmitting }) => {
      await mutate({
        variables: { teamId, name: values.name },
        update(store, { data: {submitComment} }) => {
          const data = store.readQuery({ query: allTeamsQuery });
          data.channels.push(submitComment);
          store.writeQuery({ query: CommentAppQuery, data });
        }
      })
      onClose();
      setSubmitting(false);
    },
  })
)(AddChannelModal);

