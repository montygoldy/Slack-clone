import React from 'react';
import styled from 'styled-components';

const TeamsWrapper = styled.div`
  grid-column: 1;
  grid-row: 1 / 4;
  background-color: #362234;
  color: #958993;
`;

const TeamList = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0px;
`;

const TeamListItem = styled.li`
  width: 50px;
  height: 50px;
  background-color: #676066;
  color: #fff;
  margin: auto;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  border-radius: 11px;
  &:hover{
    border: thick solid #767676;
  }
`;

const team = ({id, initial}) => <TeamListItem key={`team-${id}`}>{initial}</TeamListItem>

export default ({ teams }) => (
  <TeamsWrapper>
      <TeamList>{teams.map(team)}</TeamList>
  </TeamsWrapper>
);