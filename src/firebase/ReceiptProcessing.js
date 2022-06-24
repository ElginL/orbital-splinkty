import axios from 'axios';

const getData = async (base64) => {
    const functionUrl = "https://us-central1-splinkty-8a9f7.cloudfunctions.net/widgets/getData";

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