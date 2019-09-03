import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import { editMeetupSuccess, newMeetupSuccess } from './actions';

export function* editMeetup({ payload }) {
  console.tron.log(payload);
  try {
    const { id } = payload;
    const { title, description, location, date, banner } = payload.data;

    const meetup = {
      title,
      description,
      location,
      date,
      banner: banner.id,
    };

    const response = yield call(api.put, `meetup/${id}`, meetup);

    toast.success('Meetup autalizado com sucesso!');

    yield put(editMeetupSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar Meetup, confira os dados inseridos!');
  }
}

export function* newMeetup({ payload }) {
  try {
    const { title, description, location, date, banner } = payload.data;

    const meetup = {
      title,
      description,
      location,
      date,
      banner,
    };

    const response = yield call(api.post, 'meetup', meetup);

    toast.success('Meetup criado com sucesso!');

    yield put(newMeetupSuccess(response.data));
  } catch (err) {
    toast.error('Erro ao criar Meetup, confira os dados inseridos!');
  }
}

export function* deleteMeetup({ payload }) {
  try {
    const { id } = payload;

    yield call(api.delete, `meetup/${id}`);
    history.push('/');
  } catch (err) {
    toast.error('Não foi possivel deletar o Meetup, verifique a conexão');
  }
}

export default all([
  takeLatest('@meetup/EDIT_MEETUP_REQUEST', editMeetup),
  takeLatest('@meetup/NEW_MEETUP_REQUEST', newMeetup),
  takeLatest('@meetup/DELETE_MEETUP', deleteMeetup),
]);
