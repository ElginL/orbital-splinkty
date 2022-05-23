import { View, Text, StyleSheet } from 'react-native';
import { isLoggedIn } from '../firebase/loginAPI';

const Home = () => {
    console.log(isLoggedIn);
    return (
        <View>
            <Text>Home Page!!!</Text>
        </View>
    )
};

const styles = StyleSheet.create({

});

export default Home;