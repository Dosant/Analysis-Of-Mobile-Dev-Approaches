const defaultState = {
    loadingState: true,
    networkError: false
};

const app = (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_STATE':
      return {
          ...state,
          loadingState: false
      };

    default:
      return state
  }
}

export default app