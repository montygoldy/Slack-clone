import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import { withFormik } from 'formik';
import gql from 'graphql-tag';
import { compose, graphql } from 'react-apollo';

const InputWrapper =  styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;

const ENTER_KEY = 13;



const SendMessage = ({ values, handleChange, handleBlur, handleSubmit, isSubmitting, channelName }) => (
  <InputWrapper>
    <Input
      onKeyDown = {(e) => {
        if(e.keyCode === ENTER_KEY && !isSubmitting){
          handleSubmit(e);
        }
      }}
      name="message"
      value={values.message}
      onChange={handleChange}
      onBlur={handleBlur}
      fluid
      placeholder={`Message # ${channelName}`}/>
  </InputWrapper>
);

const createMessageMutation = gql`
  mutation($channelId: Int!, $text: String!){
    createMessage(channelId: $channelId, text: $text)
  }
`;

export default compose(
  graphql(createMessageMutation),
  withFormik({
  mapPropsToValues: props => ({ message: '' }),

  handleSubmit: async (values, { props: { channelId, mutate }, setSubmitting, resetForm }) => {
    if(!values.message || !values.message.trim()){
      setSubmitting(false);
      return;
    }
    await mutate({
      variables: { channelId, text: values.message },
    })
    resetForm(false);
  },
}))(SendMessage);