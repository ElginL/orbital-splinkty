import { 
    render,
    fireEvent,
} from '@testing-library/react-native';
import Login from '../../screens/Login';

jest.mock('react-native-keyboard-aware-scroll-view', () => {
    const KeyboardAwareScrollView = require('react-native').ScrollView;
    return { KeyboardAwareScrollView };
});

/* Unit Tests */
it("renders login screen properly", () => {
    const { getAllByText, getByPlaceholderText } = render(<Login />);
    
    // Ensures Account Login text is rendered.
    expect(getAllByText("Account Login").length).toBe(1);

    // Ensure both text inputs are rendered to allow login.
    getByPlaceholderText("Enter your email address");
    getByPlaceholderText("Enter your password")

    // Ensure Login button rendered
    expect(getAllByText("Log In").length).toBe(1);

    // Ensure Sign up button rendered
    expect(getAllByText("Sign Up").length).toBe(1);
});

describe("Error modal on attempt to log in with invalid credentials", () => {
    // Logging in with empty email and password
    it("empty email and password", async () => {
        const { getByText, findByText } = render(<Login />);
    
        fireEvent.press(getByText('Log In'));
    
        await findByText("The email address is badly formatted.");
    });

    // Logging in with valid email and invalid password
    it("valid email and invalid password", async () => {
        const { getByText, findByText, getByPlaceholderText } = render(<Login />);

        fireEvent.changeText(getByPlaceholderText("Enter your email address"), "test1@test.com");
        fireEvent.changeText(getByPlaceholderText("Enter your password"), "invalidpw");
        fireEvent.press(getByText('Log In'));

        await findByText("The username or password is invalid");
    });

    // Logging in with invalid email and password
    it("invalid email and invalid password", async () => {
        const { getByText, findByText, getByPlaceholderText } = render(<Login />);

        fireEvent.changeText(getByPlaceholderText("Enter your email address"), "invalid@inval.com");
        fireEvent.changeText(getByPlaceholderText("Enter your password"), "invalpw");
        fireEvent.press(getByText('Log In'));
        await findByText("The username or password is invalid");
    });
});