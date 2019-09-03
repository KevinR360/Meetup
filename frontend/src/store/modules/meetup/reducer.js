import produce from 'immer';

const INITIAL_STATE = {
  meetup: null,
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/EDIT_MEETUP_REQUEST': {
        draft.meetup = action.payload.meetup;
        break;
      }
      case '@meetup/EDIT_MEETUP_SUCCESS': {
        draft.meetup = action.payload.meetup;

        break;
      }
      case '@meetup/NEW_MEETUP_REQUEST': {
        draft.meetup = action.payload.meetup;
        break;
      }
      case '@meetup/NEW_MEETUP_SUCCESS': {
        draft.meetup = action.payload.meetup;
        break;
      }
      case '@meetup/DELETE_MEETUP': {
        draft.meetup = null;
        break;
      }

      case '@meetup/SAVE_MEETUP': {
        draft.meetup = action.payload.meetup;
        break;
      }
      default:
    }
  });
}
