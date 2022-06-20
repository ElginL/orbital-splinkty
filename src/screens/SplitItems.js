import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from 'react-native';
import { DraxProvider } from 'react-native-drax';
import { useSelector } from 'react-redux';
import ItemDraggable from '../components/ItemDraggable';
import ItemReceiver from '../components/ItemReceiver';

const SplitItems = () => {
    const profileImgs = useSelector(state => state.users.profilePictures);

    const draggableItems = useSelector(state => state.receipt.receiptItems);
    const receivingItemList = useSelector(state => state.receipt.activeGroupMembers);

    return (
        <DraxProvider>
            <View style={styles.container}>
                <Text style={styles.allItemsText}>
                    Drag and Drop
                </Text>
                <View style={styles.draggableItems}>
                    {
                        draggableItems.map(item => (
                            <ItemDraggable
                                item={item}
                                key={item.id}
                            />
                        ))
                    }
                </View>
                <View style={styles.receiverContainer}>
                    <Text style={styles.activeGroupText}>
                        Group Members
                    </Text>
                    {
                        receivingItemList.length === 0
                            ? (
                                <Text style={styles.noText}>
                                    No group members yet, {'\n'} 
                                    go back one page to select members
                                </Text>
                            )
                            : (
                                <FlatList
                                    keyExtractor={item => item.email}
                                    data={receivingItemList}
                                    renderItem={({ item }) => (
                                        <ItemReceiver
                                            draggableItems={draggableItems}
                                            member={item}
                                            profileImg={profileImgs[item.email]}
                                        />
                                    )}
                                />
                            )
                    }
                </View>
            </View>
        </DraxProvider>
    );
};

const styles = StyleSheet.create({
    allItemsText: {
        fontSize: 30,
        margin: 10
    },
    activeGroupText: {
        fontSize: 25,
        marginHorizontal: 10
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    draggableItems: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 20
    },
    noText: {
        textAlign: 'center',
        marginTop: 50,
        fontStyle: 'italic',
        fontWeight: '300',
        opacity: 0.5
    },
    receiverContainer: {
        marginTop: 10,
        flex: 1
    },
});

export default SplitItems;