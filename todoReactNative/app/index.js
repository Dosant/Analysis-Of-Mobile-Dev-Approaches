import React from 'react-native';
import Firebase from 'firebase';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import App from './App';
import { getStoreState } from './services/PersistanceManager';
import { getRemoteState } from './services/NetworkManager';


import { setState } from './actions';
import { persistance } from './middlewares/PersistanceMiddleware';
import { remote } from './middlewares/NetworkMiddleware';


const store = createStore(reducers, applyMiddleware(remote, persistance));

export default function Root() {
    Promise.all([getStoreState(), getRemoteState()])
        .then(([localState, remoteState]) => {
            if (!localState && !remoteState) {
                return {};
            } else if (!localState || !remoteState) {
                const state = localState || remoteState;
                return state.state;
            } else {
                return (localState.ts > remoteState.ts) ? localState.state : remoteState.state;
            }
        })
        .then(state => {
            if (state) {
                store.dispatch(setState(state));
            }
        })
        .catch((err) => {
            getStoreState().then((state) => {
                if (state) {
                    store.dispatch(setState(state.state));
                }
            });
        });

    return (
        <Provider store={store}>
            <App/>
        </Provider>
    );
}
