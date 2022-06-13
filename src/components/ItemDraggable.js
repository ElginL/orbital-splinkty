import {
    Text,
    StyleSheet
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
                <Text style={styles.draggableText}>
                    {item.description}
                </Text>
            )}
        />
    );
};

const styles = StyleSheet.create({
    draggable: {
        width: 100,
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        marginHorizontal: 10,
        justifyContent: 'center'
    },
    draggableText: {
        textAlign: 'center'
    },
});

export default ItemDraggable;