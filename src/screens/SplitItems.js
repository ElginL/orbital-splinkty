import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';
import { DraxProvider, DraxList } from 'react-native-drax';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import ItemDraggable from '../components/ItemDraggable';
import ItemReceiver from '../components/ItemReceiver';

const SplitItems = () => {
    const profileImgs = useSelector(state => state.users.profilePictures);

    const draggableItems = useSelector(state => state.receipt.receiptItems);
    const receivingItemList = useSelector(state => state.receipt.activeGroupMembers);

    return (
        <GestureHandlerRootView style={styles.container}>
            <Text style={styles.allItemsText}>
                Drag and Drop
            </Text>
            <DraxProvider>
                <View style={styles.draggableItems}>
                    {
                        (() => {
                            if (draggableItems.length === 0) {
                                return (
                                    <Text style={styles.noItemsText}>
                                        No items to drag and drop {'\n'}
                                        Return to add items
                                    </Text>
                                )
                            }

                            return (
                                <DraxList
                                    data={draggableItems}
                                    renderItemContent={({ item }) => (
                                        <ItemDraggable
                                            item={item}
                                        />
                                    )}
                                    keyExtractor={item => item.id}
                                    numColumns={3}
                                />

                            )
                        })()
                    }
                </View>
                <ScrollView style={styles.receiverContainer}>
                    {
                        receivingItemList.length === 0
                            ? (
                                <Text style={styles.noText}>
                                    No group members yet, {'\n'} 
                                    go back one page to select members
                                </Text>
                            )
                            : (
                                receivingItemList.map(item => (
                                    <ItemReceiver
                                        member={item}
                                        profileImg={profileImgs[item.email]}
                                        key={item.email}
                                    />
                                ))
                            )
                    }
                </ScrollView>
            </DraxProvider>
        </GestureHandlerRootView>
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
        fontWeight: '400',
        opacity: 0.5
    },
    noItemsText: {
        textAlign: 'center',
        marginVertical: 50,
        fontStyle: 'italic',
        fontWeight: '400',
        width: '100%',
        opacity: 0.5
    },
    receiverContainer: {
        marginTop: 10,
        flex: 1
    },
});

export default SplitItems;