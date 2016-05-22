import React from 'react-native';
import {
    Component,
    Navigator,
    Text,
    TouchableHighlight,
    StyleSheet
} from 'react-native';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import Login from './Login';

import { connect } from 'react-redux';
import { addTodo, deleteTodo, editTodo, toggleFilter, doneTodo, undoneTodo, login, logout } from './actions';

const styles = StyleSheet.create({
    navbar: {
        backgroundColor: '#fff',
        height: 64,
        borderBottomWidth: 1,
        borderColor: '#E7E7E7',
    },
    navbarTitle: {
        flex: 1,
        lineHeight: 30,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18
    },
    leftNavButtonText: {
        flex: 1,
        lineHeight: 30,
        paddingLeft: 16,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16
    }
});


/*
Логин-логаут логика локально работает.
сделать асинхронно через редакс
*/


const NavigationBarRouteMapper = {
    LeftButton: (route, navigator, index, navState) => {
            if (index > 0) {
                if (route.name === 'login') {
                    return null;
                }
                return (
                    <TouchableHighlight
                        underlayColor="transparent"
                        onPress={() => { navigator.pop() }}>
                        <Text style={ styles.leftNavButtonText }>Back</Text>
                    </TouchableHighlight>
                    )
            } else {
                return  <TouchableHighlight
                            underlayColor="transparent"
                            onPress={route.onLogout}>
                            <Text style={ styles.leftNavButtonText }>Logout</Text>
                        </TouchableHighlight>
            }
    },
    Title: (route, navigator, index, navState) => {
        if (route.name === 'taskform') {
            if (route.task) {
                return (<Text style={styles.navbarTitle}> Edit Todo </Text>);
            } else {
                return (<Text style={styles.navbarTitle}> Add Todo </Text>);
            }
        } else if (route.name === 'login') {
            return (<Text style={styles.navbarTitle}> Sign In </Text>);

        }
        return (
            <Text style={styles.navbarTitle}> Todos </Text>
        );
    },
    RightButton: (route, navigator, index, navState) => {
        return null;
    }
};

class App extends Component {
    constructor(props, context) {
        console.log('---props', props);
        super(props, context);
    }
    componentDidMount() {
        this.nav.push({
                name: 'login',
            });
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isLoggedIn) {
             if (this.props.isLoggedIn) {
                 this.nav.push({
                    name: 'login',
                });
            }
        } else {
            if (!this.props.isLoggedIn) {
                this.nav.pop();
            }
        }
    }

    onLogin(email, password) {
        this.props.login(email, password);
    }

    onLogout() {
        this.props.logout();
    }

    onTaskClick(task) {
        this.nav.push({
            name: 'taskform',
            task,
        });
    }

    onAddStarted() {
        this.nav.push({
            name: 'taskform',
        });
    }

    onCancel() {
        console.log('cancelled!');
        this.nav.pop();
    }

    onAdd(task) {
        console.log('a task was added: ', task);
        this.props.addTodo(task);
        this.nav.pop();
    }

    onEdit(task) {
        console.log('a task was edited: ', task);
        this.props.editTodo(task);
        this.nav.pop();
    }

    onDelete(task) {
        console.log('a task was deleted: ', task);
        this.props.deleteTodo(task);
        this.nav.pop();
    }


    renderScene(route, nav) {
        switch (route.name) {
            case 'taskform':
                return (
                    <TaskForm
                        task={route.task}
                        onAdd={this.onAdd.bind(this) }
                        onEdit={this.onEdit.bind(this) }
                        onDelete={this.onDelete.bind(this) }
                        onCancel={this.onCancel.bind(this) }
                        />
                );

            case 'login':
                return (
                    <Login
                        onLogin={this.onLogin.bind(this) } />
                );
            default:
                return (
                    <TaskList
                        filter={this.props.filter}
                        todos={this.props.todos}
                        loading={this.props.loading}

                        onTaskClick={this.onTaskClick.bind(this) }
                        onAddStarted={this.onAddStarted.bind(this) }
                        onDone={this.props.doneTodo.bind(this) }
                        onUndone={this.props.undoneTodo.bind(this) }
                        onToggle={this.props.toggleFilter.bind(this) }
                        />
                );
        }
    }

    configureScene() {
        return Navigator.SceneConfigs.FloatFromBottom;
    }

    render() {
        return (
            <Navigator
                configureScene={this.configureScene}
                initialRoute={{ name: 'tasklist', index: 0, onLogout: this.onLogout.bind(this) }}
                ref={((nav) => {
                    this.nav = nav;
                }) }
                renderScene={this.renderScene.bind(this) }
                navigationBar={
                    <Navigator.NavigationBar
                        style={styles.navbar}
                        routeMapper={NavigationBarRouteMapper}
                        />
                }
                />
        );
    }
}


const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_COMPLETED':
            return todos.filter(t => t.completed);
        case 'SHOW_ACTIVE':
            return todos.filter(t => !t.completed);
    }
}

const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(state.todos, state.visibilityFilter),
        filter: state.visibilityFilter,
        loading: state.app.loadingState,
        isLoggedIn: state.auth.isLoggedIn
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo: (task) => {
            dispatch(addTodo(task));
        },
        deleteTodo: (task) => {
            dispatch(deleteTodo(task));
        },
        editTodo: (task) => {
            dispatch(editTodo(task));
        },
        toggleFilter: () => {
            dispatch(toggleFilter());
        },
        doneTodo: (task) => {
            dispatch(doneTodo(task));
        },
        undoneTodo: (task) => {
            dispatch(undoneTodo(task));
        },
        login: (email, password) => {
            dispatch(login(email, password));
        },
        logout: () => {
            dispatch(logout());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
