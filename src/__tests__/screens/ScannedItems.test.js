import { render, fireEvent } from '@testing-library/react-native';
import ScannedItems from '../../screens/ScannedItems';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

jest.mock('react-native-keyboard-aware-scroll-view', () => {
    return {
        KeyboardAwareScrollView: jest
            .fn()
            .mockImplementation(({ children }) => children)
    }
})

const filledComponent = (
    <Provider store={store}>
        <ScannedItems
            route={{ params: {
                itemsDescription: ["Chicken", "Egg", "Fish"],
                prices: [4.53, 2.34, 17.4],
                quantities: [3, 2, 1]
            }}}
        />
    </Provider>
)

const emptyComponent = (
    <Provider store={store}>
        <ScannedItems
            route={{ params: {
                itemsDescription: [],
                prices: [],
                quantities: []
            }}}
        />
    </Provider> 
)

describe("Scanned Items render correctly", () => {
    it("When there are no items", () => {
        const { getByText } = render(emptyComponent);

        getByText(/No Scanned Items Found/);
        getByText(/Try taking a nicer image of receipt or add manually/);
    });

    it("When there are a few items", () => {
        const { getByText, getAllByText } = render(filledComponent);

        getByText("Chicken");
        getByText("Egg");
        getByText("Fish");

        getByText("4.53");
        getByText("2.34");
        getByText("17.40");

        getByText("3x");
        getByText("2x");
        getByText("1x");

        expect(getAllByText("Edit").length).toBe(3);
    });
})

it("Edit item change quantity is working", () => {
    const { getByText, queryAllByText, getAllByText, getByPlaceholderText } = render(filledComponent);

    fireEvent.press(getAllByText("Edit")[0]);
    fireEvent.changeText(getByPlaceholderText("e.g. 1"), 5);
    fireEvent.press(getAllByText("Edit")[1]);

    getByText("5x");
    expect(queryAllByText("3x").length).toBe(0);
});

it("Edit item change price is working", () => {
    const { getByText, queryAllByText, getAllByText, getByPlaceholderText } = render(filledComponent);

    fireEvent.press(getAllByText("Edit")[0]);
    fireEvent.changeText(getByPlaceholderText("e.g. 7.22"), 5.83);
    fireEvent.press(getAllByText("Edit")[1]);

    getByText("5.83");
    expect(queryAllByText("4.53").length).toBe(0);
});

it("Edit item description is working", () => {
    const { getByText, queryAllByText, getAllByText, getByPlaceholderText } = render(filledComponent);

    fireEvent.press(getAllByText("Edit")[0]);
    fireEvent.changeText(getByPlaceholderText("e.g. Nuggets"), "Big Wings");
    fireEvent.press(getAllByText("Edit")[1]);

    getByText("Big Wings");
    expect(queryAllByText("Chicken").length).toBe(0);
})

it("Add item is possible", () => {
    const { getByText, getAllByText, getByPlaceholderText } = render(emptyComponent);

    fireEvent.press(getByText("Add Items"));
    fireEvent.changeText(getByPlaceholderText("e.g. Nuggets"), "2 pc chicken");
    fireEvent.changeText(getByPlaceholderText("e.g. 1"), 6);
    fireEvent.changeText(getByPlaceholderText("e.g. 7.22"), 12.75);
    fireEvent.press(getByText("Add"));

    expect(getAllByText("2 pc chicken").length).toBe(1);
    expect(getAllByText("6x").length).toBe(1);
    expect(getAllByText("12.75").length).toBe(1);
});

it("Delete item is possible", () => {
    const { getByText, getAllByText, queryAllByText } = render(filledComponent);

    fireEvent.press(getAllByText("Edit")[0]);
    fireEvent.press(getByText("Delete"));

    expect(queryAllByText("Chicken").length).toBe(0);
    expect(queryAllByText("4.53").length).toBe(0);
    expect(queryAllByText("3").length).toBe(0);
})