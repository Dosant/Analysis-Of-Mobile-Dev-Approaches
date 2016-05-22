import React from 'react-native';

const {
    View,
    Text,
    TouchableHighlight,
    Image,
} = React;


export default function render(styles) {

    const localStyle = React.StyleSheet.create({
        doneButton: {
            borderRadius: 5,
            padding: 5,
        }
    });

    const getDoneButton = () => {
        return (
            <TouchableHighlight
                onPress={this.onDonePressed.bind(this)}
                underlayColor="#ddd"
            >
                <Image
                    source={require('../../images/done.png')}
                />
            </TouchableHighlight>
        )
    }

    const getUndoneButton = () => {
        return (
            <TouchableHighlight
                onPress={this.onUndonePressed.bind(this)}
                underlayColor="#ddd"
            >
                <Text>X</Text>
            </TouchableHighlight>
        )
    }


    return (
        <View style={[styles.container, localStyle.row]}>
            <TouchableHighlight
                onPress={this.onClick.bind(this)}
                underlayColor="#ddd"
            >
                <Text
                    style={styles.label}
                >{this.props.todo.task.title}</Text>
            </TouchableHighlight>

            {this.props.todo.completed ? getUndoneButton() : getDoneButton()}
        </View>
    );
}
