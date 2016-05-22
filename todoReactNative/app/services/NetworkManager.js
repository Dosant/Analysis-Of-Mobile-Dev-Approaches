import React from 'react-native';
import Firebase from 'firebase';

const stateRef = new Firebase('todoantondosov.firebaseio.com/state');

export function setRemoteState(state) {
    stateRef.set({ ts: Date.now(), state });
}

export function getRemoteState() {
    return fetch('https://todoantondosov.firebaseio.com/state.json')
        .then((res) => {
            return res.json();
        });
}
