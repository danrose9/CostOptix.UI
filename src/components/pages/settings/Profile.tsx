import React, { useState } from 'react';
import { Tab, Form, Button, Grid } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { reduxState } from '../../../services/redux/reduxState';
import { setOrganizationName } from '../../../services/redux/thunks/userProfileThunk';
import { SectionTitle, StyledFormInput, StyledAvatar, AvatarDiv } from '../../__styles__/settings.styles';
import { IRootState } from 'src/services/redux/rootReducer';
import { useAppDispatch } from 'src/services/redux/store';

export const Profile = () => {
  const dispatch = useAppDispatch();

  const profile = useSelector((state: IRootState) => state[reduxState.USER_PROFILE]);
  const [disableButton, setDisableButton] = useState(true);
  const [organization, setOrganization] = useState('');

  const userAvatar = useSelector((state: IRootState) => state[reduxState.USER_PROFILE].photo.image);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value ? setDisableButton(false) : setDisableButton(true);
    setOrganization(e.target.value);
  };

  const handleClick = () => {
    dispatch(setOrganizationName(organization));
    setDisableButton(true);
  };

  return (
    <>
      <Tab.Pane color="blue">
        <SectionTitle>Personal Information</SectionTitle>
        <Grid>
          <Grid.Column width={10}>
            <Form size="small">
              <StyledFormInput label="Name" placeholder={profile.name} readOnly icon="user" />
              <StyledFormInput label="Email Address" readOnly placeholder={profile.email} icon="mail" />
            </Form>
          </Grid.Column>
          <Grid.Column width={6}>
            <AvatarDiv>
              <StyledAvatar avatar src={userAvatar} />
            </AvatarDiv>
          </Grid.Column>
        </Grid>
      </Tab.Pane>
      <Tab.Pane color="olive">
        <SectionTitle>Company Information</SectionTitle>
        <Form size="small">
          <Form.Group widths="equal">
            <StyledFormInput
              positive
              label="Organization Name"
              placeholder={profile.organization.name}
              icon="users"
              value={organization}
              onChange={handleOnChange}
            />
            <StyledFormInput
              label="Organization Id"
              readOnly
              placeholder={profile.organization.id}
              icon="address card outline"
            />
          </Form.Group>

          <Button color="teal" disabled={disableButton} onClick={handleClick}>
            Update
          </Button>
        </Form>
      </Tab.Pane>
    </>
  );
};

export default Profile;
