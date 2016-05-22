import { setStoreState } from '../services/PersistanceManager';

export const persistance = store => next => action => {
    next(action);
    setStoreState(store.getState());
};
