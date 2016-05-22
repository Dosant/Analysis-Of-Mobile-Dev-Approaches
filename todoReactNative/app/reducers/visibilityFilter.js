const visibilityFilter = (state = 'SHOW_ACTIVE', action) => {
  switch (action.type) {
    case 'TOGGLE_FILTER':
      return state === 'SHOW_ACTIVE' ? 'SHOW_COMPLETED' : 'SHOW_ACTIVE';
    default:
      return state
  }
}

export default visibilityFilter