import {
    View,
    TextInput,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ActiveGroupSearchBar = ({ friendsEmail, setFilteredFriends }) => {
    const filter = text => {
        return friendsEmail.filter(friendEmail => friendEmail.startsWith(text));
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <FontAwesome
                        name="search"
                        size={25}
                        color="black"
                        style={{ marginRight: 10}}
                />
                <TextInput
                    style={styles.input}
                    autoCapitalize='none'
                    autoComplete='off'
                    placeholder="Search for Members"
                    onChangeText={text => setFilteredFriends(filter(text))}
                />
            </View>
        </TouchableWithoutFeedback>
    )
};

const styles = StyleSheet.create({
    container: {
        margin: 10,
        backgroundColor: '#EDEDED',
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
    },
    input: {
        fontSize: 18,
        width: '100%',
        height: '100%'
    }
})

export default ActiveGroupSearchBar;