import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from 'react-native';
import { DraxProvider } from 'react-native-drax';
import { useDispatch, useSelector } from 'react-redux';
import ItemDraggable from '../components/ItemDraggable';
import ItemReceiver from '../components/ItemReceiver';
import { addMemberToReceiptItems } from '../store/receiptSlice';

const SplitItems = () => {
    const dispatch = useDispatch();

    const profileImgs = useSelector(state => state.users.profilePictures);

    const draggableItems = useSelector(state => state.receipt.receiptItems)
    const receivingItemList = useSelector(state => state.receipt.activeGroupMembers);

    useEffect(() => {
        receivingItemList.forEach(receivingItem => {
            dispatch(addMemberToReceiptItems({
                member: receivingItem
            }))
        })  
    }, [receivingItemList]);

    return (
        <DraxProvider>
            <View style={styles.container}>
                <Text style={styles.allItemsText}>
                    All Items
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
                    <FlatList
                        keyExtractor={item => Math.random(1000)}
                        data={receivingItemList}
                        renderItem={({ item }) => (
                            <ItemReceiver
                                email={item}
                                profileImg={profileImgs[item]}
                                receivedItems={draggableItems.filter(draggableItem => {
                                    return draggableItem[item] > 0;
                                })}
                            />
                        )}
                    />
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
    receiverContainer: {
        marginTop: 10,
        flex: 1
    },
});

export default SplitItems;