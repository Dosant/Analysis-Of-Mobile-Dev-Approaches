import { setRemoteState } from '../services/NetworkManager';

export const remote = store => next => action => {
    next(action);
    setRemoteState(store.getState());
};
