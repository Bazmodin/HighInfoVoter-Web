import axios from 'axios';

const apiVersion = 'v1'; //Bad developer, store in config

class ProPublicaApiService {

    static getSenators(state, apiKey, onSuccess, onError) {
        axios.get(`https://api.propublica.org/congress/${apiVersion}/members/senate/${state}/current.json`,
            { headers: {'X-API-Key': `${apiKey}`}})
            .then(onSuccess)
            .catch(onError)
    }

    static getRepresentative(state, district, apiKey, onSuccess, onError) {
        axios.get(`https://api.propublica.org/congress/${apiVersion}/members/house/${state}/${district}/current.json`, { headers: {'X-API-Key': `${apiKey}`}})
            .then(onSuccess)
            .catch(onError)
    }

    static getMember(memberId, apiKey, onSuccess, onError) {
        axios.get(`https://api.propublica.org/congress/${apiVersion}/members/${memberId}.json`, { headers: {'X-API-Key': `${apiKey}`}})
            .then(onSuccess)
            .catch(onError)
    }
}

export default ProPublicaApiService;