import {
    View,
    Text,
    StyleSheet,
    FlatList,
} from 'react-native';
import { DraxProvider, DraxScrollView } from 'react-native-drax';
import { useSelector } from 'react-redux';
import ItemDraggable from '../components/ItemDraggable';
import ItemReceiver from '../components/ItemReceiver';

const SplitItems = () => {
    const profileImgs = useSelector(state => state.users.profilePictures);

    const draggableItems = [
        {
            id: 1,
            description: 'Nuggets',
            quantity: 6,
            price: 7.20
        },
        {
            id: 2,
            description: 'Mac Spicy',
            quantity: 1,
            price: 7.70
        },
        {
            id: 3,
            description: 'Fish Balls',
            quantity: 3,
            price: 4.32
        }
    ];

    const receivingItemList = [
        {
            id: 4,
            email: "test1@test.com",
        },
        {
            id: 5,
            email: "test2@test.com",
        }
    ];

    return (
        <DraxProvider>
            <View style={styles.container}>
                <Text style={styles.allItemsText}>
                    All Items
                </Text>
                <DraxScrollView>
                    <FlatList
                        keyExtractor={item => item.id}
                        data={draggableItems}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={styles.itemsList}
                        renderItem={({ item }) => (
                            <ItemDraggable item={item} />
                        )}
                    />
                </DraxScrollView>
                <View style={styles.receiverContainer}>
                    <Text style={styles.activeGroupText}>
                        Group Members
                    </Text>
                    <FlatList
                        keyExtractor={item => item.id}
                        data={receivingItemList}
                        renderItem={({ item }) => (
                            <ItemReceiver
                                item={item}
                                profileImgs={profileImgs}
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
        fontSize: 30,
        margin: 10
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    receiverContainer: {
        marginTop: 20,
    },
});

export default SplitItems;