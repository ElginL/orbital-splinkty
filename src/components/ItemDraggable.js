import {
    Text,
    StyleSheet,
    View
} from 'react-native';
import { DraxView } from 'react-native-drax';

const ItemDraggable = ({ item }) => {
    return (
        <DraxView
            style={styles.draggable}
            onDragStart={() => {
                console.log(`dragging ${item.description}`);
            }}
            payload={item}
            renderContent={() => (
                <View style={styles.draggableItem}>
                    <Text style={styles.draggableText}>
                        {item.description}
                    </Text>
                    <Text style={styles.draggableQty}>Qty: {item.quantity}</Text>
                </View>
            )}
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
        justifyContent: 'center'
    },
    draggableText: {
        textAlign: 'center'
    },
    draggableQty: {
        textAlign: 'center',
        marginTop: 5
    }
});

export default ItemDraggable;