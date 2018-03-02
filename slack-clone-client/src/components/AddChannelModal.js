import React from 'react'
import { Form, Input, Button, Header, Modal } from 'semantic-ui-react'
import '../style.css';

const ModalModalExample = ({open, onClose}) => (
  <Modal open={open} onClose={onClose}>
    <Modal.Header>Add Channel</Modal.Header>
    <Modal.Content>
      <Form>
        <Form.Field>
          <Input fluid placeholder="Channel Name"/>
        </Form.Field>
        <Form.Group widths="equal" >
          <Button fluid>Create Channel</Button>
          <Button fluid>Cancel</Button>
        </Form.Group>
      </Form>
    </Modal.Content>
  </Modal>
)

export default ModalModalExample