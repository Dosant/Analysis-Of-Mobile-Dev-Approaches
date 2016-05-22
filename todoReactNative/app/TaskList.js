import React from 'react-native';

const {
    View,
    ListView,
    TouchableHighlight,
    Text,
    Switch,
    ActivityIndicatorIOS,
} = React;

import TaskRow from './TaskRow/Component';

const styles = React.StyleSheet.create({
    container: {
        paddingTop: 64,
        backgroundColor: '#F7F7F7',
        flex: 1,
        justifyContent: 'flex-start',
    },
    button: {
        height: 60,
        borderColor: '#05A5D1',
        borderWidth: 2,
        backgroundColor: '#333',
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FAFAFA',
        fontSize: 20,
        fontWeight: '600',
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});


class TaskList extends React.Component {
    constructor(props, context) {
        super(props, context);
        console.log(this.props.onToggle);
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => {
                return r1 !== r2;
            },
        });

        this.state = {
            dataSource: ds.cloneWithRows(props.todos),
        };
    }

    componentWillReceiveProps(nextProps) {
        const dataSource = this
            .state
            .dataSource
            .cloneWithRows(nextProps.todos);

        this.setState({ dataSource });
    }

    getSwitchText() {
        const filterText = this.props.filter === 'SHOW_ACTIVE' ? 'pending' : 'completed';
        return `Showing ${this.props.todos.length} ${filterText} todo(s)`;
    }

    renderRow(todo) {
        return (
            <TaskRow
                onDone={this.props.onDone}
                onUndone={this.props.onUndone}
                onClick={this.props.onTaskClick}
                todo={todo}
                />
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <View
                    style={{
                        flexDirection: 'row',
                        padding: 10,
                    }}
                    >
                    <Switch
                        onValueChange={this.props.onToggle}
                        style={{
                            marginBottom: 10,
                        }}
                        value={this.props.filter !== 'SHOW_ACTIVE'}
                        />
                    <Text style={{
                        fontSize: 20,
                        paddingLeft: 10,
                        paddingTop: 3,
                    }}
                        >
                        {this.getSwitchText() }
                    </Text>
                </View>

                {this.props.loading ?
                    <ActivityIndicatorIOS
                        animating={this.props.loading}
                        style={[styles.centering, { height: 80 }]}
                        size="small"
                        /> :
                    null}

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this) }
                    />

                <TouchableHighlight
                    onPress={this.props.onAddStarted}
                    style={styles.button}
                    >
                    <Text
                        style={styles.buttonText}
                        >
                        Add one
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

TaskList.propTypes = {
    filter: React.PropTypes.string.isRequired,
    todos: React.PropTypes
        .arrayOf(React.PropTypes.object).isRequired,
    loading: React.PropTypes.bool.isRequired,
    onTaskClick: React.PropTypes.func.isRequired,
    onAddStarted: React.PropTypes.func.isRequired,
    onDone: React.PropTypes.func.isRequired,
    onUndone: React.PropTypes.func.isRequired,
    onToggle: React.PropTypes.func.isRequired,
};

export default TaskList;
