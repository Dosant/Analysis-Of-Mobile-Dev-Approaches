import React from 'react-native';
const {
    AsyncStorage,
} = React;

export function getStoreState() {
    return AsyncStorage.getItem('state')
        .then((res) => {
            if (res) {
                return JSON.parse(res);
            }
        });
}

export function setStoreState(state) {
    const toPersist = {
        ts: Date.now(),
        state
    };
    const stateString = JSON.stringify(toPersist);
    return AsyncStorage.setItem('state', stateString);
}
