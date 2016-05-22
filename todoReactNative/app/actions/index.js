export const setState = (state) => {
    return {
        type: 'SET_STATE',
        state
    }
}

export const addTodo = (task) => {
    return {
        type: 'ADD_TODO',
        task
    };
}

export const editTodo = (task) => {
    return {
        type: 'EDIT_TODO',
        task
    };
}

export const deleteTodo = (task) => {
    return {
        type: 'DELETE_TODO',
        task
    };
}

export const doneTodo = (task) => {
    return {
        type: 'DONE_TODO',
        task
    };
}

export const undoneTodo = (task) => {
    return {
        type: 'UNDONE_TODO',
        task
    };
}

export const toggleFilter = () => {
    return {
        type: 'TOGGLE_FILTER'
    };
}

export const login = (email, password) => {
    return {
        type: 'LOGIN_START',
        login: {
            email,
            password
        }
    };
}

export const logout = () => {
    return {
        type: 'LOGOUT_START'
    };
}
