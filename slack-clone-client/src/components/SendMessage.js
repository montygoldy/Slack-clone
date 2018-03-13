import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import { withFormik } from 'formik';

const InputWrapper =  styled.div`
  grid-column: 3;
  grid-row: 3;
  margin: 20px;
`;

const SendMessage = ({ values, handleChange, handleBlur, handleSubmit, isSubmitting, channelName }) => (
  <InputWrapper>
    <Input name="message" value={values.message} onChange={handleChange} onBlur={handleBlur} fluid placeholder={`Message # ${channelName}`}/>
  </InputWrapper>
);

export default withFormik({ })(SendMessage);