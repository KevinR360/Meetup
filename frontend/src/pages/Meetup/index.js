import React, { useState, useEffect } from 'react';
import { Form, Input, Textarea } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import BannerInput from './BannerInput';

import {
  editMeetupRequest,
  newMeetupRequest,
} from '~/store/modules/meetup/actions';

import { Container, Content } from './styles';
import api from '~/services/api';
import history from '~/services/history';

export default function Meetup() {
  const dispatch = useDispatch();
  const meetupState = useSelector(state => state.meetup.meetup);
  const meetup_id = window.location.search.replace('?', '');
  const action = window.location.pathname;
  const [meetup, setMeetup] = useState([]);

  console.tron.log(action);

  useEffect(() => {
    async function loadMeetupData() {
      if (meetup_id) {
        if (!meetupState) {
          try {
            const response = await api.get(`meetup/${meetup_id}`);
            setMeetup(response.data);
          } catch (err) {
            history.push('/dashboard');
          }
        } else {
          setMeetup(meetupState);
        }
      }
    }
    loadMeetupData();
  }, [meetupState, meetup_id]);

  async function handleSubmit(data) {
    if (action !== '/meetup/new') {
      dispatch(editMeetupRequest(meetup_id, data));
    } else {
      dispatch(newMeetupRequest(data));
    }
  }

  return (
    <Container>
      <Content>
        <Form initialData={meetup_id ? meetup : null} onSubmit={handleSubmit}>
          <BannerInput name="banner" />
          <Input name="title" type="text" placeholder="Titulo do Meetup" />
          <Textarea
            defaultValue={meetup.description}
            name="description"
            type="text"
            placeholder={meetup.description}
          />
          <Input name="date" type="date" placeholder="Data do meetup" />
          <Input name="location" type="text" placeholder="Localização" />

          <button type="submit">
            <MdAddCircleOutline size={20} style={{ marginRight: 5 }} />
            Salvar meetup
          </button>
        </Form>
      </Content>
    </Container>
  );
}
