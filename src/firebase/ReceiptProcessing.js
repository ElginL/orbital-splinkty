import axios from 'axios';
import {
    receiptScanningURL
} from '@env';

const getData = async (base64) => {
    const functionUrl = receiptScanningURL;

    try {
        const { data } = await axios.post(functionUrl, {
            base64
        });
        
        return data.data;
    } catch (error) {
        console.log(error.response.data);
    }

}

export default getData;