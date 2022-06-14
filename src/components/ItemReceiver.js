import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList
} from 'react-native';
import { useDispatch } from 'react-redux';
import { DraxView } from 'react-native-drax';
import { editReceiptItemsMember } from '../store/receiptSlice';

const ItemReceiver = ({ email, profileImg, receivedItems }) => {
    const dispatch = useDispatch();

    return (
        <View>
            <View style={styles.contact}>
                <Image
                    source={{ uri: profileImg }}
                    style={styles.profileImg}
                />
                <Text style={styles.emailText}>
                    {email}
                </Text>
            </View>
            <DraxView
                renderContent={() => (
                    <FlatList
                        keyExtractor={item => item.id}
                        style={styles.receivedItems}
                        data={receivedItems}
                        renderItem={({ item }) => (
                            <Text>{item.description}</Text>
                        )}
                        horizontal={true}
                    />
                )}
                onReceiveDragDrop={({ dragged: { payload } }) => {
                    dispatch(editReceiptItemsMember({
                        id: payload.id,
                        member: email
                    }))
                }}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    contact: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    emailText: {
        fontSize: 18
    },
    profileImg: {
        width: 66,
        height: 66,
        borderRadius: 33,
        marginRight: 20
    },
    receivedItems: {
        borderWidth: 1,
        height: 60,
        marginHorizontal: 10
    }
})

export default ItemReceiver;