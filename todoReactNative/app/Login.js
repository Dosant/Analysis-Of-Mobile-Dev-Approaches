import React from 'react-native';

const {
    View,
    TouchableHighlight,
    Text,
    TextInput,
    ActivityIndicatorIOS,
} = React;

const styles = React.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        paddingTop: 128,
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


class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.creds = {
            email: '',
            password: ''
        }
    }

    onEmailChange(email) {
        this.creds.email = email;
    }

    onPasswordChange(password) {
       this.creds.password = password;
    }

    onLogin() {
        const { email, password } = this.creds;
        if (email && password) {
            this.props.onLogin(email, password);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.label}>E-mail: </Text>
                <TextInput
                    onChangeText={this.onEmailChange.bind(this)}
                    style={styles.input}
                    />
                <Text style={styles.label}>Password: </Text>
                <TextInput
                    onChangeText={this.onPasswordChange.bind(this)}
                    secureTextEntry={true}
                    style={styles.input}
                    />
                <TouchableHighlight
                    onPress={this.onLogin.bind(this) }
                    style={styles.button}
                    >
                    <Text
                        style={styles.buttonText}
                        >
                        Sign In
                    </Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.button}
                    >
                    <Text
                        style={styles.buttonText}
                        >
                        Sign Up
                    </Text>
                </TouchableHighlight>
            </View>

        );
    }
}

export default Login;
