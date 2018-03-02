import React from 'react'
import { Form, Input, Button, Modal } from 'semantic-ui-react'
import '../style.css';
import { withFormik } from 'formik';

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

export default withFormik({
  mapPropsToValues: props => ({ name: '' }),

  handleSubmit: (values, { props, setSubmitting }) => {
    console.log(values);
    console.log("submitting.....");
    setSubmitting(false);
  },
})(AddChannelModal);