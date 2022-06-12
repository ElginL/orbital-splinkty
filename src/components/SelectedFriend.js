import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

const SelectedFriends = ({ email, profileImg, removeMember }) => {
    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={() => removeMember(email)}>
            <Entypo name="circle-with-cross" 
                size={24} 
                color="black"
                style={styles.cross}
            />
            <Image
                source={{ uri: profileImg }}
                style={styles.profileImg}
            />
            <Text style={styles.email} ellipsizeMode='tail' numberOfLines={1}>
                {email}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    cross: {
        position: 'absolute',
        top: 0,
        right: 12,
        zIndex: 9
    },
    profileImg: {
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    email: {
        width: '70%'
    }
});

export default SelectedFriends;