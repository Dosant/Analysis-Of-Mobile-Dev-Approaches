function todos(todos = [], action) {
    switch (action.type) {
        case 'SET_STATE':
            return action.state.todos || [];
        case 'ADD_TODO':
            return todos.concat([{
                id: Date.now(),
                task: action.task,
                completed: false,
            }]);
        case 'DELETE_TODO':
            return todos.filter((todo) => {
                return todo.id !== action.task.id;
            });

        case 'EDIT_TODO':
            const idx = todos.findIndex((todo) => {
                return todo.id === action.task.id;
            });
            return todos.slice(0, idx).concat([action.task]).concat(todos.slice(idx + 1));



        case 'DONE_TODO':
            return todos.map((todo) => {
                if (todo.id === action.task.id) {
                    return { ...todo, completed: true };
                }
                return todo;
            });

        case 'UNDONE_TODO':
            return todos.map((todo) => {
                if (todo.id === action.task.id) {
                    return { ...todo, completed: false }
                }
                return todo;
            });

        default:
            return todos;
    }
}

export default todos;
