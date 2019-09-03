import React, { useEffect, useState } from 'react';
import { parseISO, format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { MdChevronRight, MdAddCircleOutline } from 'react-icons/md';

import { Container, Content } from './styles';

import { saveMeetup } from '~/store/modules/meetup/actions';

import api from '~/services/api';
import history from '~/services/history';

export default function Dashboard() {
  const dispatch = useDispatch();
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    async function loadMeetups() {
      const response = await api.get('meetups');

      setMeetups(response.data);
    }

    loadMeetups();
  }, []);

  function handleToDatails(meetup) {
    const id = meetup.id;

    dispatch(saveMeetup(meetup));

    history.push(`/details/?${id}`);
  }

  function handleToNew() {
    history.push(`/meetup/new`);
  }

  return (
    <Container>
      <Content>
        <header>
          <strong>Meus Meetups</strong>
          <button type="button" onClick={handleToNew}>
            <MdAddCircleOutline size={20} />
            <span>Novo meetup</span>
          </button>
        </header>

        <ul>
          {meetups.map(meetup => (
            <li key={String(meetup.id)}>
              <strong>{meetup.title}</strong>
              <div>
                <span>
                  {format(parseISO(meetup.date), "d 'de' MMMM")}
                </span>
                <button type="button" onClick={() => handleToDatails(meetup)}>
                  <MdChevronRight size={25} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </Content>
    </Container>
  );
}
