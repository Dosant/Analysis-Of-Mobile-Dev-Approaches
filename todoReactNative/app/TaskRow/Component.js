import React from 'react-native';
import Render from './Render';

const {
    InteractionManager,
} = React;

const styles = React.StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#E7E7E7',
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    label: {
        fontSize: 20,
        fontWeight: '300',
    },
    doneButton: {
        borderRadius: 5,
        backgroundColor: '#EAEAEA',
        padding: 5,
    },
});

class TaskRow extends React.Component {
    onDonePressed() {
        InteractionManager.runAfterInteractions(() => {
            this.props.onDone(this.props.todo);
        });
    }
    onUndonePressed() {
        InteractionManager.runAfterInteractions(() => {
            this.props.onUndone(this.props.todo);
        });
    }

    onClick() {
        this.props.onClick(this.props.todo);
    }

    render() {
        return Render.bind(this)(styles);
    }
}

TaskRow.propTypes = {
    onDone: React.PropTypes.func.isRequired,
    onUndone: React.PropTypes.func.isRequired,
    onClick: React.PropTypes.func.isRequired,

    todo: React.PropTypes.shape({
        task: React.PropTypes.shape({
            title: React.PropTypes.string.isRequired,
        }).isRequired,
    }).isRequired,
};

export default TaskRow;
