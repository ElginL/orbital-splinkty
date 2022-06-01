import { View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import LoadingStyles from '../styles/LoadingStyles';

const LoadingOverlay = () => {
    return (
        <View style={LoadingStyles.container}>
            <Spinner 
                visible={true}
                animation={'fade'}
                overlayColor={'rgba(0,0,0,0.6)'}
                textContent={'Loading...'}
                textStyle={LoadingStyles.spinnerTextStyle}
            />
        </View>
    );
}

export default LoadingOverlay;