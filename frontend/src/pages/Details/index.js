import React, { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useDispatch } from 'react-redux';
import pt from 'date-fns/locale/pt';
import {
  MdModeEdit,
  MdDeleteForever,
  MdInsertInvitation,
  MdPlace,
} from 'react-icons/md';

import { deleteMeetup } from '~/store/modules/meetup/actions';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content } from './styles';

export default function Details() {
  const dispatch = useDispatch();
  const id = window.location.search.replace('?', '');
  const [meetup, setMeetup] = useState([]);

  useEffect(() => {
    async function loadMeetup() {
      try {
        const response = await api.get(`meetup/${id}`);

        const data = {
          ...response.data,
          dateFormated: format(
            parseISO(response.data.date),
            "d 'de' MMMM', ás' HH'h'",
            {
              locale: pt,
            }
          ),
        };

        setMeetup(data);
      } catch (err) {
        history.push('/dashboard');
      }
    }

    loadMeetup();
  }, [id]);

  function handleToMeetupEdit() {
    history.push(`/meetup/edit/?${id}`);
  }

  function handleDelete(id) {
    dispatch(deleteMeetup(id));
  }

  return (
    <Container>
      <Content>
        <header>
          <strong>{meetup.title}</strong>
          <div>
            <button type="button" onClick={handleToMeetupEdit}>
              <MdModeEdit size={20} />
              <span>Editar</span>
            </button>
            <button type="button" onClick={() => handleDelete(meetup.id)}>
              <MdDeleteForever size={20} />
              <span>Deletar</span>
            </button>
          </div>
        </header>

        <div>
          <aside>
            <img src={meetup.file ? meetup.file.url : ''} alt="banner" />
          </aside>
          <p>{meetup.description}</p>
          <span>
            {meetup.author
              ? `Caso queria participar como palestrante do meetup envie um e-mail
            para ${meetup.author.email}.`
              : null}
          </span>
          <footer>
            <span>
              <MdInsertInvitation
                size={16}
                color="#999"
                style={{ marginRight: 5 }}
              />
              {meetup.dateFormated}
            </span>
            <span>
              <MdPlace size={16} color="#999" style={{ marginRight: 5 }} />
              {meetup.location}
            </span>
          </footer>
        </div>
      </Content>
    </Container>
  );
}
