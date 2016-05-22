const defaultState = {
    isLoggedIn: false,
    user: {
        email: '',
        password: ''
    }
};

const auth = (state = defaultState, action) => {
  switch (action.type) {
      case 'SET_STATE':
      return action.state.auth || state;

    case 'LOGIN_START':
      return {
          isLoggedIn: true,
          user: {
              email: action.login.email,
              password: action.login.password,
          }
      };

      case 'LOGOUT_START':
        return defaultState;

    default:
      return state;
  }
};

export default auth;
