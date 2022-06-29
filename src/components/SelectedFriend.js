import {
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { removeActiveGroupMember } from '../store/receiptSlice';
import CachedImage from 'react-native-expo-cached-image';

const SelectedFriends = ({ member, profileImg }) => {
    const dispatch = useDispatch();

    const removeMember = memberToRemove => {
        dispatch(removeActiveGroupMember({
            memberToRemove
        }));
    };

    return (
        <TouchableOpacity 
            style={styles.container}
            onPress={() => removeMember(member.email)}>
            <Entypo name="circle-with-cross" 
                size={24} 
                color="black"
                style={styles.cross}
            />
            <CachedImage
                isBackground
                source={{ uri: profileImg }}
                style={styles.profileImg}
            />
            <Text style={styles.email} ellipsizeMode='tail' numberOfLines={1}>
                {member.email}
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
        overflow: 'hidden'
    },
    email: {
        width: '70%'
    }
});

export default SelectedFriends;