import {
    Text,
    StyleSheet,
    View
} from 'react-native';
import { DraxView } from 'react-native-drax';

const ItemDraggable = ({ item }) => {
    return (
        <DraxView
            style={item.remainingQuantity !== 0 ? styles.draggable : [styles.draggable, styles.notDraggable]}
            onDragStart={() => {
                console.log(`dragging ${item.description}`);
            }}
            payload={item}
            renderContent={() => (
                <View>
                    <Text style={styles.draggableText}>
                        {item.description}
                    </Text>
                    <Text style={styles.draggableQty}>
                        Qty: {item.remainingQuantity}
                    </Text>
                </View>
            )}
            draggingStyle={styles.draggingStyle}
            draggable={!(item.remainingQuantity === 0)}
        />
    );
};

const styles = StyleSheet.create({
    draggable: {
        width: 100,
        height: 60,
        borderWidth: 1,
        borderRadius: 10,
        margin: 10,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    draggableText: {
        textAlign: 'center'
    },
    draggableQty: {
        textAlign: 'center',
        marginTop: 5
    },
    draggingStyle: {
        opacity: 0.1
    },
    notDraggable: {
        opacity: 0.1
    }
});

export default ItemDraggable;