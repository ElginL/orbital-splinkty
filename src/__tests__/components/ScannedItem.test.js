import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import ScannedItem from '../../components/ScannedItem';

describe("Scanned Item render correctly", () => {
    it("Renders correctly with the given prop", () => {
        const component = (
            <Provider store={store}>
                <ScannedItem 
                    item={{
                        initialQuantity: 3,
                        description: "Chicken",
                        price: 4.53
                    }}
                    isValidFormInput={() => {}}
                />
            </Provider>
        );

        const { getByText } = render(component);
        getByText("3x");
        getByText("4.53");
        getByText("Chicken");

        getByText("Edit");
    });
});