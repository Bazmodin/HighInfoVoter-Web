import axios from 'axios';

const apiVersion = 'v2'; //Bad developer, store in config

class GoogleApiService {

    static getDistrict(fullAddress, apiKey, onSuccess, onError) {
        axios.get(`https://www.googleapis.com/civicinfo/${apiVersion}/representatives?key=${apiKey}&address=${fullAddress}&roles=legislatorLowerBody&levels=country`)
            .then(onSuccess)
            .catch(onError)
    }
}

export default GoogleApiService;