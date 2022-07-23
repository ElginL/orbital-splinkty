import { render } from '@testing-library/react-native';
import FriendRequest from '../../components/FriendRequest';

it("renders a friend request correctly", () => {
    const { getByText } = render(<FriendRequest item={{ from: 'frog@from.com', id: 1 }} />);

    getByText("frog@from.com");
    getByText("Confirm");
    getByText("Decline");
});