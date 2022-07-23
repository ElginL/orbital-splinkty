import { 
    render,
} from '@testing-library/react-native';
import Signup from '../../screens/Signup';

jest.mock('react-native-keyboard-aware-scroll-view', () => {
    const KeyboardAwareScrollView = require('react-native').ScrollView;
    return { KeyboardAwareScrollView };
});

/* Unit Tests */
it("renders login screen properly", () => {
    const { getAllByText, getByPlaceholderText } = render(<Signup />);
    
    // Ensures Register Account text is rendered.
    expect(getAllByText("Register Account").length).toBe(1);

    // Ensure all text inputs are rendered to allow sign up.
    getByPlaceholderText("Enter your email address");
    getByPlaceholderText("Enter your password");
    getByPlaceholderText("Confirm Password");

    // Ensure Go back to login page button rendered
    expect(getAllByText("Go back to sign in").length).toBe(1);

    // Ensure Sign up button rendered
    expect(getAllByText("Sign Up").length).toBe(1);
});