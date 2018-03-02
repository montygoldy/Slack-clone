import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

export const allTeamsQuery = gql`
  {
    allTeams {
      id
      name
      channels {
        id
        name
      }
    }
  }
`;