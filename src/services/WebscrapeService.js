import axios from 'axios';

class WebscrapeService {

    static scrapePortrait(name, onSuccess, onError) {
        axios.get(`api/webscrape/portrait?name=${name}`)
            .then(onSuccess)
            .catch(onError)
    }

    static scrapeAll(onSuccess, onError) {
        axios.get('api/webscrape/scrapeall')
            .then(onSuccess)
            .catch(onError)
    }
}

export default WebscrapeService;