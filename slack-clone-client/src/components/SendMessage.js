import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import { withFormik } from 'formik';

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

export default withFormik({
  mapPropsToValues: props => ({ name: '' }),

  handleSubmit: async (values, { props: { onClose, teamId, mutate }, setSubmitting }) => {
    await mutate({
      variables: { teamId, name: values.name },
      optimisticResponse: {
        createChannel: {
          __typename: 'Mutation',
          ok: true,
          channel: {
            __typename: 'Channel',
            id: -1,
            name: values.name
          }
        }
      },
      update: (store, { data: { createChannel } }) => {
        const { ok, channel } = createChannel;
        console.log(createChannel);
        if(!ok){
          return;
        }

        const data = store.readQuery({ query: allTeamsQuery });
        const teamIdx = findIndex(data.allTeams, ['id', teamId]);
        console.log(data);
        data.allTeams[teamIdx].channels.push(channel);
        store.writeQuery({ query: allTeamsQuery, data });
      }
    })
    onClose();
    setSubmitting(false);
  },
})(SendMessage);