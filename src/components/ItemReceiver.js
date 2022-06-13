import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList
} from 'react-native';
import { DraxView } from 'react-native-drax';
import ItemDraggable from './ItemDraggable';

const ItemReceiver = ({ item, profileImgs }) => {
    const [receivedItems, setReceivedItems] = useState([]);

    return (
        <DraxView
            renderContent={() => (
                <View>
                    <View style={styles.contact}>
                        <Image
                            source={{ uri: profileImgs[item.email] }}
                            style={styles.profileImg}
                        />
                        <Text style={styles.emailText}>
                            {item.email}
                        </Text>
                    </View>
                    <FlatList
                        keyExtractor={item => item.id}
                        style={styles.receivedItems}
                        data={receivedItems}
                        renderItem={({ item }) => (
                            <ItemDraggable item={item} />
                        )}
                    />
                </View>
            )}
            onReceiveDragDrop={({ dragged: { payload } }) => {
                setReceivedItems([ ...receivedItems, payload ]);
            }}
        />
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