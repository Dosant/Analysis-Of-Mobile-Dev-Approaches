import React from 'react-native';

const {
    View,
    Text,
    TouchableHighlight,
} = React;

import Swipeout from 'react-native-swipeout';

const localStyle = React.StyleSheet.create({
    row: {
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
    },
    container: {
        marginBottom: 20,
    },
});

export default function render(baseStyle) {
    const buttons = [];
    if (this.props.todo.completed) {
        buttons.push({
            text: 'Undone',
            color: '#727272',
            backgroundColor: '#FFEB3B',
            underlayColor: '#273539',
            onPress: this.onUndonePressed.bind(this),
        });
    } else {
        buttons.push({
            text: 'Done',
            backgroundColor: '#03A9F4',
            underlayColor: '#273539',
            onPress: this.onDonePressed.bind(this),
        });
    }

    return (
            <View
                style={localStyle.container}
            >
                <Swipeout
                    autoClose="true"
                    backgroundColor="#fff"
                    right={buttons}
                >
                    <TouchableHighlight onPress={this.onClick.bind(this)}>
                        <View style={[baseStyle.container, localStyle.row]}>
                            <Text
                                style={baseStyle.label}
                            >{this.props.todo.task.title}</Text>
                        </View>
                    </TouchableHighlight>
                </Swipeout>
            </View>
    );
}
