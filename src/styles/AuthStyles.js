import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    blueBGBtn: {
        backgroundColor: '#24a0ed',
        width: '70%',
        margin: 10,
        padding: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16
    },
    textInput: {
        borderColor: 'black',
        borderWidth: 1,
        padding: 10,
        width: '70%',
        margin: 10
    },
    headerTitle: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 20
    },
    teamLogo: {
        alignSelf: 'center',
        height: '35%',
        width: '50%',
        marginTop: 50
    },
    screenContainer: {
        flex: 1
    },
    formContainer: {
        alignItems: 'center',
    }
});

export default styles;