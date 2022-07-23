import { render } from '@testing-library/react-native';
import SearchResult from '../../components/SearchResult';
import { useSelector } from 'react-redux';

jest.mock('react-redux');

describe("Search Result is rendered properly", () => {
    it("Displays result properly for friend request not sent", () => {
        useSelector
            .mockReturnValueOnce([]) // Outgoing requests
            .mockReturnValueOnce({}) // notification tokens

        const component = (
            <SearchResult
                user={{ email: 'sample@sam.com' }}
                profilePic={null}
            />
        )

        const { getByText } = render(component);

        getByText("sample@sam.com");
        getByText("Add");
    })

    it("Displays result properly for friend request sent", () => {
        useSelector
            .mockReturnValueOnce([{ to: "sdf@sdf.com" }])
            .mockReturnValueOnce({});

        const component = (
            <SearchResult
                user={{ email: 'sdf@sdf.com' }}
                profilePic={null}
            />
        );

        const { getByText } = render(component);

        getByText('sdf@sdf.com');
        getByText('Cancel');
    })
})