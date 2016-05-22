import React from 'react-native';

const {
    Text,
    TextInput,
    View,
    TouchableHighlight,
} = React;

const styles = React.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 64,
        backgroundColor: '#F7F7F7',
    },
    input: {
        borderWidth: 1,
        borderColor: '#D7D7D7',
        height: 50,
        marginLeft: 10,
        marginRight: 10,
        padding: 15,
        borderRadius: 3,
        fontSize: 18
    },
    inputNotes: {
        height: 150
    },
    label: {
        marginTop: 10,
        marginBottom: 4,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 18,
        color: '#05A5D1'
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#FAFAFA',
    },
    button: {
        height: 45,
        alignSelf: 'stretch',
        backgroundColor: '#05A5D1',
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        backgroundColor: '#666',
    },
});

class TaskForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.editMode = !!this.props.task;
        if (this.props.task) {
            this.task = this.props.task.task
        } else {
            this.task = {};
        }
    }

    onChangeTitle(text) {
        this.task.title = text;
    }

    onChangeDescription(text) {
        this.task.description = text;
    }

    onAddPressed() {
        if (this.task)
            this.props.onAdd(this.task);
    }

    onEditPressed() {
        this.props.onEdit(Object.assign({}, this.props.task, {task: this.task}))
    }

    onDeletePressed() {
        this.props.onDelete(this.props.task)
    }

    getAddButton() {
        return (
            <TouchableHighlight
                onPress={this.onAddPressed.bind(this) }
                style={styles.button}
                >
                <Text
                    style={styles.buttonText}
                    >
                    Add
                </Text>
            </TouchableHighlight>
        )
    }

    getEditButton() {
        return (
            <TouchableHighlight
                onPress={this.onEditPressed.bind(this) }
                style={styles.button}
                >
                <Text
                    style={styles.buttonText}
                    >
                    Edit
                </Text>
            </TouchableHighlight>
        );
    }

    getDeleteButton() {
        return (
            <TouchableHighlight
                onPress={this.onDeletePressed.bind(this) }
                style={styles.button}
                >
                <Text style={styles.buttonText}>
                    Delete
                </Text>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>Title: </Text>
                <TextInput
                    defaultValue={this.editMode ? this.task.title : ''}
                    onChangeText={this.onChangeTitle.bind(this) }
                    style={styles.input}
                    />
                <Text style={styles.label}>Notes: </Text>
                <TextInput
                    defaultValue={this.editMode ? this.task.description : ''}
                    multiline={true}
                    onChangeText={this.onChangeDescription.bind(this) }
                    style={[styles.input, styles.inputNotes]}
                    />

                 {this.editMode ? this.getEditButton() : this.getAddButton()}
                 {this.editMode ? this.getDeleteButton() : null}

                <TouchableHighlight
                    onPress={this.props.onCancel}
                    style={[styles.button, styles.cancelButton]}
                    >
                    <Text
                        style={styles.buttonText}
                        >
                        Cancel
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

TaskForm.propTypes = {
    onAdd: React.PropTypes.func.isRequired,
    onCancel: React.PropTypes.func.isRequired,
};

export default TaskForm;
