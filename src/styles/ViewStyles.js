import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    modalView: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },

    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },

    popupBG: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 10,
        width: '90%',
        height: '30%',
    },

    popupButton: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#24a0ed',
        borderRadius: 5,
        width: '30%',
        height: '15%',
        bottom: '5%',
        right: '5%',
    },

    popupMessageText: {
        flexShrink: 1,
        color: 'black',
        fontSize: 16,
        paddingLeft: 5,
        paddingRight: 5,
    },

    popupButtonText: {
        flexShrink: 1,
        color: 'white',
        fontSize: 16
    }
})

export default styles;