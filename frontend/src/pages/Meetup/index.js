import React, { useState, useEffect } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { MdAddCircleOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import BannerInput from './BannerInput';

import {
  editMeetupRequest,
  newMeetupRequest,
} from '~/store/modules/meetup/actions';

import { Container, Content } from './styles';
import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  title: Yup.string().required('O titulo do evento é obrigatório'),
  description: Yup.string(),
  date: Yup.date(
    'Ops você esqueceu da data, é necessário ter uma data.'
  ).required('Ops você esqueceu da data, é necessário ter uma data.'),
  location: Yup.string().required('Ops! Onde vai ocorrer o Meetup?'),
});

export default function Meetup() {
  const dispatch = useDispatch();
  const meetupState = useSelector(state => state.meetup.meetup);
  const meetup_id = window.location.search.replace('?', '');
  const action = window.location.pathname;
  const [meetup, setMeetup] = useState([]);

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
        <Form
          schema={schema}
          initialData={meetup_id ? meetup : null}
          onSubmit={handleSubmit}
        >
          <BannerInput name="banner" />
          <Input name="title" type="text" placeholder="Titulo do Meetup" />
          <Input
            name="description"
            multiline
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
