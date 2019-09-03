export function editMeetupRequest(id, data) {
  return {
    type: '@meetup/EDIT_MEETUP_REQUEST',
    payload: { id, data },
  };
}

export function editMeetupSuccess(meetup) {
  return {
    type: '@meetup/EDIT_MEETUP_SUCCESS',
    payload: { meetup },
  };
}

export function newMeetupRequest(data) {
  return {
    type: '@meetup/NEW_MEETUP_REQUEST',
    payload: { data },
  };
}

export function newMeetupSuccess(meetup) {
  return {
    type: '@meetup/NEW_MEETUP_SUCCESS',
    payload: { meetup },
  };
}

export function saveMeetup(meetup) {
  return {
    type: '@meetup/SAVE_MEETUP',
    payload: { meetup },
  };
}

export function deleteMeetup(id) {
  return {
    type: '@meetup/DELETE_MEETUP',
    payload: { id },
  };
}
